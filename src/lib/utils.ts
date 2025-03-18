import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Theme } from "~/components/theme/theme-provider";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function themeToLabel(theme: Theme) {
  switch (theme) {
    case "light":
      return "라이트";
    case "dark":
      return "다크";
    case "system":
      return "시스템";
  }
}
