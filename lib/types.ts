export type ElementType = "heading" | "paragraph" | "button" | "image" | "container";

export interface ElementPosition {
  x: number;
  y: number;
}

export interface ElementStyles {
  [key: string]: string;
}

export interface ElementInstance {
  id: string;
  type: ElementType;
  position: ElementPosition;
  styles: ElementStyles;
  content: string;
  children?: string[]; // IDs of child elements for container types
}

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  elements: ElementInstance[];
}

export interface HistoryState {
  elements: ElementInstance[];
  selectedElementId: string | null;
}

export interface ElementDefinition {
  type: ElementType;
  label: string;
  icon: string;
  defaultStyles: ElementStyles;
  defaultContent: string;
}