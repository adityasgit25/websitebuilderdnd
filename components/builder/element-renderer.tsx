"use client"

import { ElementInstance } from "@/lib/types";

interface ElementRendererProps {
  element: ElementInstance;
}

export default function ElementRenderer({ element }: ElementRendererProps) {
  // Convert style object to inline CSS style object
  const inlineStyles = { ...element.styles };

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