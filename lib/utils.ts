import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const focusInput = "focus:border-primary";

export const focusRing =
  "outline outline-offset-2 outline-0 focus-visible:outline-2 outline-primary dark:outline-primary";

export const hasErrorInput =
  "ring-2 border-red-500 dark:border-red-700 ring-red-200 dark:ring-red-700/30";
