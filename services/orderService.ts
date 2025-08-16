import { apiClient } from "../lib/api-client";
import type { Price, PriceHistory, Asset, OrderResponse } from "@/lib/models";

export const fetchOrders = async () => {
  return apiClient.get<OrderResponse[]>("/orders")
    .then((response) => {
      return response.data;
    }).catch((error) => {
      console.error("Error fetching orders:", error);
      throw error || new Error("Failed to fetch orders. Please try again.");
    });
};

export const fetchOrderById = async (orderId: number) => {
  return apiClient.get<OrderResponse>(`/orders/${orderId}`)
    .then((response) => {
      return response.data;
    }).catch((error) => {
      console.error("Error fetching order by ID:", error);
      throw error || new Error("Failed to fetch order. Please try again.");
    });
};

export const getOrderHistoryByAccountId = async (accountId: number) => {
  let cursorId: string | undefined | null = null;
  let limit: number | undefined | null = 10;
  return apiClient.get<OrderResponse[]>(`/trades/${accountId}`, 
    { params: { cursorId: cursorId, limit: limit } })
    .then((response) => {
        console.log("Fetched order history:", response.data);
      return response.data;
    }).catch((error) => {
      console.error("Error fetching order history:", error);
      throw error || new Error("Failed to fetch order history. Please try again.");
    });
};
