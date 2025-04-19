"use client"

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BuilderHeader } from "./builder-header";
import { BuilderSidebar } from "./builder-sidebar";
import { BuilderCanvas } from "./builder-canvas";
import { BuilderProperties } from "./builder-properties";
import { useWebsiteBuilder } from "@/hooks/use-website-builder";
import { BuilderContextProvider } from "./builder-context";
import { BuilderPreview } from "./builder-preview";

export function WebsiteBuilder() {
  const [previewMode, setPreviewMode] = useState<boolean>(false);
  
  return (
    <DndProvider backend={HTML5Backend}>
      <BuilderContextProvider>
        <div className="flex flex-col h-screen">
          <BuilderHeader 
            onPreviewToggle={() => setPreviewMode(!previewMode)} 
            previewMode={previewMode} 
          />
          <div className="flex flex-1 overflow-hidden">
            {!previewMode ? (
              <>
                <BuilderSidebar />
                <BuilderCanvas />
                <BuilderProperties />
              </>
            ) : (
              <BuilderPreview />
            )}
          </div>
        </div>
      </BuilderContextProvider>
    </DndProvider>
  );
}