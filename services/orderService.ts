import { apiClient } from "../lib/api-client";
import type { OrderResponse } from "@/lib/models";

export const fetchOrders = async () => {
  return apiClient
    .get<OrderResponse[]>("/orders")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching orders:", error);
      throw error || new Error("Failed to fetch orders. Please try again.");
    });
};

export const fetchOrderById = async (orderId: number) => {
  return apiClient
    .get<OrderResponse>(`/orders/${orderId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching order by ID:", error);
      throw error || new Error("Failed to fetch order. Please try again.");
    });
};

export const getOrderHistoryByAccountId = async (
  accountId: number,
  cursor: string | null = null,
  limit: number = 10
) => {
  try {
    const params: Record<string, any> = { limit };
    if (cursor != null) params.cursorId = cursor;
    const response = await apiClient.get(`/trades/${accountId}`, { params });

    console.debug(
      "[orderService] getOrderHistoryByAccountId",
      { accountId, cursor, limit },
      response?.data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching order history:", error);
    throw (
      error || new Error("Failed to fetch order history. Please try again.")
    );
  }
};
