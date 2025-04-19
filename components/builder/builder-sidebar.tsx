"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GalleryHorizontalEnd, 
  Heading, 
  Image, 
  Layers, 
  Layout, 
  LayoutGrid, 
  SquareStack, 
  Text, 
  Type 
} from "lucide-react";
import { ElementType } from "@/lib/types";
import { DraggableElement } from "./draggable-element";

export function BuilderSidebar() {
  const elementCategories = [
    {
      name: "Basic",
      elements: [
        { type: "heading", label: "Heading", icon: <Heading className="h-4 w-4" /> },
        { type: "paragraph", label: "Paragraph", icon: <Text className="h-4 w-4" /> },
        { type: "button", label: "Button", icon: <SquareStack className="h-4 w-4" /> },
        { type: "image", label: "Image", icon: <Image className="h-4 w-4" /> },
        { type: "container", label: "Container", icon: <Layout className="h-4 w-4" /> }
      ]
    },
    {
      name: "Layout",
      elements: [
        { type: "container", label: "Container", icon: <Layout className="h-4 w-4" /> },
        { type: "container", label: "Column Layout", icon: <LayoutGrid className="h-4 w-4" /> },
      ]
    },
    {
      name: "Media",
      elements: [
        { type: "image", label: "Image", icon: <Image className="h-4 w-4" /> },
        { type: "image", label: "Gallery", icon: <GalleryHorizontalEnd className="h-4 w-4" /> },
      ]
    }
  ];

  return (
    <div className="w-64 border-r bg-muted/20 flex flex-col">
      <Tabs defaultValue="elements">
        <div className="border-b p-2">
          <TabsList className="w-full">
            <TabsTrigger value="elements" className="flex-1">
              <Type className="h-4 w-4 mr-2" />
              Elements
            </TabsTrigger>
            <TabsTrigger value="layers" className="flex-1">
              <Layers className="h-4 w-4 mr-2" />
              Layers
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="elements" className="flex-1 p-0">
          <ScrollArea className="h-[calc(100vh-8.5rem)]">
            <div className="p-4 space-y-6">
              {elementCategories.map((category) => (
                <div key={category.name}>
                  <h3 className="text-sm font-medium mb-3">{category.name}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {category.elements.map((element, i) => (
                      <DraggableElement
                        key={`${category.name}-${element.type}-${i}`}
                        type={element.type as ElementType}
                        label={element.label}
                        icon={element.icon}
                      />
                    ))}
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="layers" className="flex-1 p-4">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              View and organize all elements on your page.
            </p>
            
            {/* Placeholder for layer tree */}
            <div className="border rounded-md p-4 text-center">
              <p className="text-sm text-muted-foreground">
                No elements added yet.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}