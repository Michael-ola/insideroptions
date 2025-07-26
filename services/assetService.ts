import { Asset } from "@/lib/models";
import { apiClient } from "../lib/api-client";

export const fetchAssets = async () => {
  return apiClient.get<Asset[]>("/assets")
  .then((response) => {
    return response.data;
  }).catch((error) => {
    console.error("Error fetching assets:", error);
    throw error || new Error("Failed to fetch assets. Please try again.");
  });
};

export const streamAssetPriceByAssetId = async (
    assetId: number,
    onPriceUpdate: (data: { assetId: number; symbol: string; price: number; timestamp: string }) => void
) => {
  const eventSource = new EventSource(`${apiClient.defaults.baseURL}/prices/${assetId}/stream`, {
    withCredentials: true,
  });

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onPriceUpdate(data);
  };

  eventSource.onerror = (error) => {
    console.error("Error in SSE connection:", error);
    eventSource.close();
  };

  return () => {
    eventSource.close();
  };
}



