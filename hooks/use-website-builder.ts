"use client"

import { useContext } from "react";
import { BuilderContext } from "@/components/builder/builder-context";

export function useWebsiteBuilder() {
  const context = useContext(BuilderContext);
  
  if (!context) {
    throw new Error("useWebsiteBuilder must be used within a BuilderContextProvider");
  }
  
  return context;
}