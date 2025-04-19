"use client"

import { useCallback } from "react";
import { useDrop } from "react-dnd";
import { useWebsiteBuilder } from "@/hooks/use-website-builder";
import { ElementType } from "@/lib/types";
import { DroppedElement } from "./dropped-element";
import { ScrollArea } from "@/components/ui/scroll-area";

export function BuilderCanvas() {
  const { 
    elements, 
    addElement, 
    selectElement, 
    selectedElement 
  } = useWebsiteBuilder();

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    // Only deselect if clicking directly on the canvas, not on an element
    if (e.currentTarget === e.target) {
      selectElement(null);
    }
  }, [selectElement]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ELEMENT",
    drop: (item: { type: ElementType }, monitor) => {
      const offset = monitor.getSourceClientOffset();
      
      if (offset) {
        // Calculate position relative to drop target
        const dropTargetRect = (document.getElementById('canvas-container') as HTMLElement).getBoundingClientRect();
        const position = {
          x: offset.x - dropTargetRect.left,
          y: offset.y - dropTargetRect.top,
        };
        
        addElement(item.type, { position });
      } else {
        // Fallback if we can't determine position
        addElement(item.type);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [addElement]);

  return (
    <div className="flex-1 overflow-hidden bg-muted/50 relative">
      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <div 
          ref={drop}
          id="canvas-container"
          className={`min-h-[calc(100vh-3.5rem)] w-full relative p-8 transition-colors duration-150 ${isOver ? 'bg-blue-50/50' : ''}`}
          onClick={handleCanvasClick}
        >
          <div className="w-full max-w-4xl mx-auto min-h-screen bg-white shadow-md rounded-md relative">
            {elements.map((element) => (
              <DroppedElement
                key={element.id}
                element={element}
                isSelected={selectedElement?.id === element.id}
              />
            ))}
            
            {elements.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <p className="text-center">
                  Drag and drop elements from the sidebar<br />
                  or select a template to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}