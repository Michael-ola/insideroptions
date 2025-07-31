import { NextApiRequest, NextApiResponse } from "next";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";
const frontendBaseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
const MAX_RETRIES = Infinity;
const INITIAL_BACKOFF_MS = 5000;
const MAX_BACKOFF_MS = 30000;
const CONNECTION_TIMEOUT_MS = 8000;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { token, id: assetId } = req.query;

    if (!isValidParams(token, assetId)) {
        return res.status(400).json({ error: "Missing or invalid token or asset ID" });
    }

    if (req.method === "OPTIONS") {
        res.status(204).end();
        return;
    }

    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    setupSSEHeaders(res);

    let clientClosed = false;
    req.on("close", () => {
        clientClosed = true;
        res.end();
    });

    const pingInterval = setupKeepAlivePing(res, () => clientClosed);

    try {
        const upstream = await retryConnectToBackendStream(
            String(token),
            String(assetId),
            () => clientClosed,
        );

        if (!upstream?.ok || !upstream.body) {
            clearInterval(pingInterval);
            return res.status(502).json({ error: "Unable to connect to backend." });
        }

        const reader = upstream.body.getReader();
        const decoder = new TextDecoder("utf-8");

        req.on("close", () => {
            clientClosed = true;
            clearInterval(pingInterval);
            reader.cancel().catch(() => {});
        });

        await forwardStream(reader, decoder, res, () => clientClosed);

    } catch (err) {
        console.error("💥 Fatal error in proxy handler:", err);
        if (!res.headersSent) res.status(500).json({ error: "Proxy stream failure" });
    }
};

const isValidParams = (token: string | string[] | undefined, assetId: string | string[] | undefined): boolean => {
    return typeof token === "string" && typeof assetId === "string";
};

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};

const setupSSEHeaders = (res: NextApiResponse) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.removeHeader("Content-Length");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Content-Encoding", "identity");
    res.setHeader("Access-Control-Allow-Origin", frontendBaseUrl);
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization, X-Requested-With, Origin");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.flushHeaders();
    res.write(":\n\n"); // Kickstart
};

const setupKeepAlivePing = (res: NextApiResponse, isClosed: () => boolean): NodeJS.Timeout => {
    return setInterval(() => {
        if (!isClosed()) res.write(": keep-alive\n\n");
    }, 15000);
};

const forwardStream = async (
    reader: ReadableStreamDefaultReader<Uint8Array>,
    decoder: TextDecoder,
    res: NextApiResponse,
    isClosed: () => boolean
) => {
    try {
        while (!isClosed()) {
            const { done, value } = await reader.read();
            if (done || isClosed()) break;

            const chunk = decoder.decode(value, { stream: true }).trim();
            if (!chunk) continue;
            res.write(Buffer.from(value));
        }
    } catch (err) {
        console.error("❌ Error forwarding SSE:", err);
    }
};

const retryConnectToBackendStream = async (
    token: string,
    assetId: string,
    isClosed: () => boolean
): Promise<Response | null> => {
    let retries = 0;
    let delay = INITIAL_BACKOFF_MS;

    while (!isClosed() && retries < MAX_RETRIES) {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), CONNECTION_TIMEOUT_MS);

            const requestProps = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "text/event-stream",
                },
                signal: controller.signal,
            };

            const response = await fetch(`${apiBaseUrl}/api/v1/prices/${assetId}/stream`, requestProps);

            clearTimeout(timeout);

            if (response.ok && response.body) {
                console.log(`✅ Connected to backend (attempt ${retries + 1})`);
                return response;
            }

            console.warn(`⚠️ Backend responded with ${response.status}. Retrying...`);

        } catch (error) {
            console.error(`⛔ Connection attempt ${retries + 1} failed:`, error);
        }

        retries++;
        if (isClosed()) break;

        console.log(`🔁 Retrying in ${Math.min(delay, MAX_BACKOFF_MS)}ms...`);
        await new Promise(res => setTimeout(res, delay));
        delay = Math.min(delay * 2, MAX_BACKOFF_MS); // Exponential backoff
    }

    return null;
};
export default handler;