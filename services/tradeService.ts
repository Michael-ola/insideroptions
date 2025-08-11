import { Price, Trade } from "@/lib/models";


export const streamTradesByAccountId = async (
  accountId: number,
  onTradeUpdate: (data: Trade) => void
): Promise<() => void> => {
  if (typeof window === "undefined") {
    console.error("SSE is not available server-side.");
    return () => {};
  }

  let token = localStorage.getItem("token");
  let eventSource: EventSource | null = null;
  let reconnectAttempts = 0;
  const maxReconnectAttempts = 3;
  let reconnectTimeout: NodeJS.Timeout | null = null;

  const handleMessage = (event: MessageEvent) => {
    let raw = event.data;
    if (raw.startsWith("data:")) raw = raw.slice(5);
    try {
      raw = raw.trim();
      if (!raw) return; // Skip empty messages
      const data: Trade = JSON.parse(raw);
      console.log("SSE trade update:", data);
      onTradeUpdate({ ...data });
    } catch (err) {
      console.error("Failed to parse SSE message:", JSON.stringify(raw), err);
    }
  };

  const handleError = async () => {
    console.error("SSE connection error", eventSource?.readyState);
    eventSource?.close();

    if (reconnectAttempts < maxReconnectAttempts) {
      reconnectAttempts++;
      if (eventSource?.readyState === EventSource.CONNECTING) {
        console.log("SSE closed. Attempting token refresh...");
        try {
          const res = await fetch("/api/refresh-token", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          });
          if (res.ok) {
            const { accessToken: newToken } = await res.json();
            localStorage.setItem("token", newToken);
            token = newToken;
            reconnectTimeout = setTimeout(() => {
              initiateSSEStream(newToken);
            }, 1000);
          } else {
            console.error("Token refresh failed.");
          }
        } catch (err) {
          console.error("Token refresh error:", err);
        }
      }
    } else {
      console.error("Max SSE reconnect attempts reached. Giving up.");
    }
  };

  const initiateSSEStream = (accessToken: string) => {
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }
    const url = `/api/trade-notification?id=${accountId}&token=${accessToken}`;
    eventSource = new EventSource(url);

    eventSource.onopen = () => {
      reconnectAttempts = 0;
      console.log("SSE connection opened");
    };

    eventSource.onmessage = handleMessage;
    eventSource.onerror = handleError;
  };

  if (token) {
    initiateSSEStream(token);
  } else {
    console.error("No access token. Cannot open SSE.");
  }

  return () => {
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }
  };
};