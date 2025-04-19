"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useWebsiteBuilder } from "@/hooks/use-website-builder";
import { PropertyPanel } from "./property-panel";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function BuilderProperties() {
  const { selectedElement, removeElement } = useWebsiteBuilder();

  if (!selectedElement) {
    return (
      <div className="w-72 border-l bg-muted/20 flex flex-col">
        <div className="p-4 border-b">
          <h3 className="text-sm font-medium">Properties</h3>
        </div>
        <div className="p-4 text-sm text-muted-foreground text-center flex-1 flex items-center justify-center">
          <p>Select an element to edit its properties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-72 border-l bg-muted/20 flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="text-sm font-medium capitalize">
          {selectedElement.type} Properties
        </h3>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-destructive"
          onClick={() => removeElement(selectedElement.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <Tabs defaultValue="content" className="flex-1 flex flex-col">
        <TabsList className="w-full rounded-none border-b">
          <TabsTrigger value="content" className="flex-1">
            Content
          </TabsTrigger>
          <TabsTrigger value="style" className="flex-1">
            Style
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex-1">
            Advanced
          </TabsTrigger>
        </TabsList>
        <ScrollArea className="flex-1">
          <TabsContent value="content" className="p-4 pt-2">
            <PropertyPanel element={selectedElement} type="content" />
          </TabsContent>
          <TabsContent value="style" className="p-4 pt-2">
            <PropertyPanel element={selectedElement} type="style" />
          </TabsContent>
          <TabsContent value="advanced" className="p-4 pt-2">
            <PropertyPanel element={selectedElement} type="advanced" />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}