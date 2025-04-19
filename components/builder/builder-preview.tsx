"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import { useWebsiteBuilder } from "@/hooks/use-website-builder";
import { ElementInstance } from "@/lib/types";

export function BuilderPreview() {
  const { elements } = useWebsiteBuilder();

  return (
    <div className="flex-1 bg-muted/50 overflow-hidden">
      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <div className="p-8">
          <div className="w-full max-w-4xl mx-auto min-h-screen bg-white shadow-md rounded-md relative">
            {elements.map((element) => (
              <PreviewElement key={element.id} element={element} />
            ))}
            
            {elements.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <p className="text-center">
                  No content to preview.<br />
                  Add elements in the editor.
                </p>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

interface PreviewElementProps {
  element: ElementInstance;
}

function PreviewElement({ element }: PreviewElementProps) {
  const inlineStyles: React.CSSProperties = {
    position: 'absolute',
    left: `${element.position.x}px`,
    top: `${element.position.y}px`,
    ...element.styles as any
  };

  switch (element.type) {
    case "heading":
      return <h2 style={inlineStyles}>{element.content}</h2>;
      
    case "paragraph":
      return <p style={inlineStyles}>{element.content}</p>;
      
    case "button":
      return (
        <button style={inlineStyles}>
          {element.content}
        </button>
      );
      
    case "image":
      return (
        <img 
          src={element.content} 
          alt="Website image" 
          style={inlineStyles}
        />
      );
      
    case "container":
      return (
        <div style={inlineStyles}>
          {element.content}
        </div>
      );
      
    default:
      return <div>Unknown element type</div>;
  }
}