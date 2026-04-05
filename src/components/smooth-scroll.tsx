"use client";

import { ReactNode } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  // User requested normal scroll with zero delay.
  // Rendering children directly bypasses all external scroll libraries.
  return <>{children}</>;
}
