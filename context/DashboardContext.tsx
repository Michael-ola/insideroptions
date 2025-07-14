"use client";

import { createContext, useContext } from "react";
import type { DashboardPropsType as DashboardContextType } from "@/types/dashboard";

export const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardProvider"
    );
  }
  return context;
};
