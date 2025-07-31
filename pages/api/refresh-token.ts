import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from 'cookie';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

async function getNewAccessToken(refreshToken: string) {
    const response = await fetch(`${apiBaseUrl}/api/v1/auth/refresh-token`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": `refreshToken=${refreshToken}` // Include the refresh token in the request
        },
        body: JSON.stringify({ refreshToken }),
    });
    
    if (!response.ok) throw new Error("Failed to refresh token");
    const data = await response.json();
    return data.accessToken;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
    const refreshToken = cookies.refreshToken;
    if (!refreshToken) {
        res.status(401).json({ error: "No refresh token" });
        return;
    }
    getNewAccessToken(refreshToken)
        .then((accessToken) => {
            res.status(200).json({ accessToken });
        })
        .catch((err) => {
            console.error("Failed to refresh token:", err);
            res.status(401).json({ error: "Failed to refresh token", details: err instanceof Error ? err.message : String(err) });
        });
}

export default handler;
