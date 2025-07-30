import { Asset } from "@/lib/models";
import { apiClient } from "../lib/api-client";
import type { PriceHistory } from "@/lib/models";

export const fetchAssets = async () => {
  return apiClient.get<Asset[]>("/assets")
    .then((response) => {
      return response.data;
    }).catch((error) => {
      console.error("Error fetching assets:", error);
      throw error || new Error("Failed to fetch assets. Please try again.");
    });
};

export const fetchPriceHistoryByAssetId = async (assetId: number) => {
  return apiClient.get<PriceHistory[]>(`/prices/${assetId}`)
    .then((response) => {
      return response.data;
    }).catch((error) => {
      console.error("Error fetching asset by ID:", error);
      throw error || new Error("Failed to fetch asset. Please try again.");
    });
};

export const streamAssetPriceByAssetId = async (
  assetId: number,
  onPriceUpdate: (data: { price: number; time: number }) => void
): Promise<() => void> => {
  if (typeof window === "undefined") {
    console.error("SSE is not available server-side.");
    return () => { };
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
      const data: PriceHistory = JSON.parse(raw);
      const unixTime = Math.floor(new Date(data.timestamp).getTime() / 1000);
      onPriceUpdate({ price: data.price, time: unixTime });
    } catch (err) {
      console.error("Failed to parse SSE message:", err);
    }
  };

  const handleCustomEvent = (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      console.log("Custom SSE event:", data);
    } catch (err) {
      console.error("Invalid custom event data:", err);
    }
  };

  const handleError = async () => {
    console.error("SSE connection error", eventSource?.readyState);
    eventSource?.close();

    // Only attempt reconnect if not exceeded max attempts
    if (reconnectAttempts < maxReconnectAttempts) {
      reconnectAttempts++;
      // Attempt token refresh only if connecting
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
            // Add a small delay before reconnecting
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
    // Clean up any previous EventSource and timeout
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }
    const url = `/api/stream-price?id=${assetId}&token=${accessToken}`;
    eventSource = new EventSource(url);

    eventSource.onopen = () => {
      reconnectAttempts = 0; // Reset on successful open
      console.log("SSE connection opened");
    };

    eventSource.onmessage = handleMessage;
    eventSource.addEventListener("priceUpdate", handleCustomEvent);
    eventSource.onerror = handleError;
  };

  // 👇 Start the stream if token is available
  if (token) {
    initiateSSEStream(token);
  } else {
    console.error("No access token. Cannot open SSE.");
  }

  // 🧹 Cleanup method
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
