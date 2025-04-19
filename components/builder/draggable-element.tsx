"use client"

import { useDrag } from "react-dnd";
import { ElementType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface DraggableElementProps {
  type: ElementType;
  label: string;
  icon: ReactNode;
}

export function DraggableElement({ type, label, icon }: DraggableElementProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ELEMENT",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Button
      ref={drag}
      variant="outline"
      size="sm"
      className={`h-auto py-2 px-3 justify-start gap-2 text-xs font-normal ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
}