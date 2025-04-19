"use client"

import { ElementInstance } from "@/lib/types";
import { useDrag } from "react-dnd";
import { useWebsiteBuilder } from "@/hooks/use-website-builder";
import ElementRenderer from "./element-renderer";

interface DroppedElementProps {
  element: ElementInstance;
  isSelected: boolean;
}

export function DroppedElement({ element, isSelected }: DroppedElementProps) {
  const { selectElement, moveElement } = useWebsiteBuilder();
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "DROPPED_ELEMENT",
    item: { id: element.id, type: element.type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [element.id, element.type]);
  
  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element.id);
  };

  const elementStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${element.position.x}px`,
    top: `${element.position.y}px`,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
    userSelect: 'none',
  };

  return (
    <div
      ref={drag}
      style={elementStyle}
      onClick={handleSelect}
      className={`${isSelected ? 'ring-2 ring-blue-500' : ''}`}
    >
      <ElementRenderer element={element} />
    </div>
  );
}