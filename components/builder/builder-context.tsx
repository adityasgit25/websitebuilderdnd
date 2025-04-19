"use client"

import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "@/lib/uuid";
import { 
  ElementInstance, 
  ElementType, 
  Template, 
  HistoryState,
  ElementStyles
} from "@/lib/types";
import { defaultTemplates } from "@/lib/templates";

interface BuilderContextType {
  // Canvas state
  elements: ElementInstance[];
  selectedElement: ElementInstance | null;
  selectedTemplate: Template;
  templates: Template[];
  
  // Actions
  addElement: (type: ElementType, payload?: any) => void;
  updateElement: (id: string, updates: Partial<ElementInstance>) => void;
  removeElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  moveElement: (id: string, position: { x: number, y: number }) => void;
  updateElementStyles: (id: string, styles: Partial<ElementStyles>) => void;
  updateElementContent: (id: string, content: string) => void;
  selectTemplate: (templateId: string) => void;
  
  // History
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const BuilderContext = createContext<BuilderContextType | null>(null);

interface BuilderContextProviderProps {
  children: ReactNode;
}

export function BuilderContextProvider({ children }: BuilderContextProviderProps) {
  const [elements, setElements] = useState<ElementInstance[]>([]);
  const [selectedElement, setSelectedElement] = useState<ElementInstance | null>(null);
  const [templates, setTemplates] = useState<Template[]>(defaultTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(defaultTemplates[0]);
  
  // History management
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [shouldRecordHistory, setShouldRecordHistory] = useState(true);
  
  // Initialize with the first template
  useEffect(() => {
    if (templates.length > 0) {
      selectTemplate(templates[0].id);
    }
  }, []);
  
  // Record history whenever elements change
  useEffect(() => {
    if (shouldRecordHistory && elements.length > 0) {
      const newHistoryState: HistoryState = {
        elements: JSON.parse(JSON.stringify(elements)),
        selectedElementId: selectedElement?.id || null
      };
      
      // Remove any "future" history if we're not at the end
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newHistoryState);
      
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  }, [elements]);
  
  const addElement = useCallback((type: ElementType, payload?: any) => {
    const newElement: ElementInstance = {
      id: uuidv4(),
      type,
      position: payload?.position || { x: 100, y: 100 },
      styles: payload?.styles || getDefaultStylesForType(type),
      content: payload?.content || getDefaultContentForType(type),
      ...payload
    };
    
    setElements(prev => [...prev, newElement]);
    selectElement(newElement.id);
  }, []);
  
  const updateElement = useCallback((id: string, updates: Partial<ElementInstance>) => {
    setElements(prev => 
      prev.map(element => 
        element.id === id ? { ...element, ...updates } : element
      )
    );
    
    if (selectedElement?.id === id) {
      setSelectedElement(prev => prev ? { ...prev, ...updates } : null);
    }
  }, [selectedElement]);
  
  const removeElement = useCallback((id: string) => {
    setElements(prev => prev.filter(element => element.id !== id));
    
    if (selectedElement?.id === id) {
      selectElement(null);
    }
  }, [selectedElement]);
  
  const selectElement = useCallback((id: string | null) => {
    if (id === null) {
      setSelectedElement(null);
      return;
    }
    
    const element = elements.find(el => el.id === id);
    setSelectedElement(element || null);
  }, [elements]);
  
  const moveElement = useCallback((id: string, position: { x: number, y: number }) => {
    updateElement(id, { position });
  }, [updateElement]);
  
  const updateElementStyles = useCallback((id: string, styles: Partial<ElementStyles>) => {
    setElements(prev => 
      prev.map(element => 
        element.id === id ? { 
          ...element, 
          styles: { 
            ...element.styles, 
            ...Object.fromEntries(
              Object.entries(styles).map(([key, value]) => [key, value || ""])
            ) 
          } 
        } : element
      )
    );
    
    if (selectedElement?.id === id) {
      setSelectedElement(prev => 
        prev ? { 
          ...prev, 
          styles: { 
            ...prev.styles, 
            ...Object.fromEntries(
              Object.entries(styles).map(([key, value]) => [key, value || ""])
            ) 
          } 
        } : null
      );
    }
  }, [selectedElement]);
  
  const updateElementContent = useCallback((id: string, content: string) => {
    updateElement(id, { content });
  }, [updateElement]);
  
  const selectTemplate = useCallback((templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    
    if (template) {
      setSelectedTemplate(template);
      setElements(JSON.parse(JSON.stringify(template.elements)));
      setSelectedElement(null);
      
      // Reset history
      setHistory([]);
      setHistoryIndex(-1);
    }
  }, [templates]);
  
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setShouldRecordHistory(false);
      const prevState = history[historyIndex - 1];
      setElements(prevState.elements);
      
      if (prevState.selectedElementId) {
        const element = prevState.elements.find(el => el.id === prevState.selectedElementId);
        setSelectedElement(element || null);
      } else {
        setSelectedElement(null);
      }
      
      setHistoryIndex(historyIndex - 1);
      
      // Re-enable history recording after state update
      setTimeout(() => {
        setShouldRecordHistory(true);
      }, 0);
    }
  }, [history, historyIndex]);
  
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setShouldRecordHistory(false);
      const nextState = history[historyIndex + 1];
      setElements(nextState.elements);
      
      if (nextState.selectedElementId) {
        const element = nextState.elements.find(el => el.id === nextState.selectedElementId);
        setSelectedElement(element || null);
      } else {
        setSelectedElement(null);
      }
      
      setHistoryIndex(historyIndex + 1);
      
      // Re-enable history recording after state update
      setTimeout(() => {
        setShouldRecordHistory(true);
      }, 0);
    }
  }, [history, historyIndex]);
  
  return (
    <BuilderContext.Provider
      value={{
        elements,
        selectedElement,
        templates,
        selectedTemplate,
        addElement,
        updateElement,
        removeElement,
        selectElement,
        moveElement,
        updateElementStyles,
        updateElementContent,
        selectTemplate,
        undo,
        redo,
        canUndo: historyIndex > 0,
        canRedo: historyIndex < history.length - 1
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

// Helper functions
function getDefaultStylesForType(type: ElementType): ElementStyles {
  switch (type) {
    case "heading":
      return {
        fontFamily: "Inter, sans-serif",
        fontSize: "32px",
        fontWeight: "700",
        color: "#000000",
        textAlign: "left",
        padding: "8px",
        margin: "8px 0"
      };
    case "paragraph":
      return {
        fontFamily: "Inter, sans-serif",
        fontSize: "16px",
        fontWeight: "400",
        color: "#333333",
        textAlign: "left",
        lineHeight: "1.5",
        padding: "8px",
        margin: "8px 0"
      };
    case "button":
      return {
        fontFamily: "Inter, sans-serif",
        fontSize: "16px",
        fontWeight: "500",
        color: "#FFFFFF",
        backgroundColor: "#3B82F6",
        padding: "12px 24px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        textAlign: "center",
        display: "inline-block",
        margin: "8px 0"
      };
    case "image":
      return {
        width: "300px",
        height: "200px",
        objectFit: "cover",
        borderRadius: "8px",
        margin: "8px 0"
      };
    case "container":
      return {
        width: "100%",
        padding: "16px",
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
        border: "1px solid #E5E7EB",
        display: "flex",
        flexDirection: "column"
      };
    default:
      return {};
  }
}

function getDefaultContentForType(type: ElementType): string {
  switch (type) {
    case "heading":
      return "Heading";
    case "paragraph":
      return "This is a paragraph of text. Click to edit this content.";
    case "button":
      return "Click Me";
    case "image":
      return "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg";
    default:
      return "";
  }
}