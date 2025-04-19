"use client"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ElementInstance, ElementStyles } from "@/lib/types";
import { useWebsiteBuilder } from "@/hooks/use-website-builder";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PropertyPanelProps {
  element: ElementInstance;
  type: "content" | "style" | "advanced";
}

export function PropertyPanel({ element, type }: PropertyPanelProps) {
  const { updateElementContent, updateElementStyles } = useWebsiteBuilder();

  const handleContentChange = (value: string) => {
    updateElementContent(element.id, value);
  };

  const handleStyleChange = (property: string, value: string) => {
    updateElementStyles(element.id, { [property]: value });
  };

  if (type === "content") {
    return (
      <div className="space-y-4">
        {element.type === "heading" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="heading-text">Heading Text</Label>
              <Textarea
                id="heading-text"
                value={element.content}
                onChange={(e) => handleContentChange(e.target.value)}
                className="min-h-20"
              />
            </div>
          </>
        )}

        {element.type === "paragraph" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="paragraph-text">Paragraph Text</Label>
              <Textarea
                id="paragraph-text"
                value={element.content}
                onChange={(e) => handleContentChange(e.target.value)}
                className="min-h-32"
              />
            </div>
          </>
        )}

        {element.type === "button" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="button-text">Button Text</Label>
              <Input
                id="button-text"
                value={element.content}
                onChange={(e) => handleContentChange(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="button-link">Button Link</Label>
              <Input
                id="button-link"
                placeholder="https://example.com"
              />
            </div>
          </>
        )}

        {element.type === "image" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="image-src">Image URL</Label>
              <Input
                id="image-src"
                value={element.content}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image-alt">Alt Text</Label>
              <Input
                id="image-alt"
                placeholder="Descriptive text for the image"
              />
            </div>
          </>
        )}
      </div>
    );
  }

  if (type === "style") {
    return (
      <div className="space-y-4">
        {(element.type === "heading" || element.type === "paragraph" || element.type === "button") && (
          <>
            <div className="space-y-2">
              <Label htmlFor="font-family">Font Family</Label>
              <Select 
                value={element.styles.fontFamily || "Inter, sans-serif"} 
                onValueChange={(value) => handleStyleChange("fontFamily", value)}
              >
                <SelectTrigger id="font-family">
                  <SelectValue placeholder="Select Font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter, sans-serif">Inter</SelectItem>
                  <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                  <SelectItem value="Georgia, serif">Georgia</SelectItem>
                  <SelectItem value="monospace">Monospace</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="font-size">Font Size</Label>
              <Input
                id="font-size"
                type="text"
                value={element.styles.fontSize || ""}
                onChange={(e) => handleStyleChange("fontSize", e.target.value)}
                placeholder="16px"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="font-weight">Font Weight</Label>
              <Select 
                value={element.styles.fontWeight || "400"} 
                onValueChange={(value) => handleStyleChange("fontWeight", value)}
              >
                <SelectTrigger id="font-weight">
                  <SelectValue placeholder="Select weight" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="300">Light</SelectItem>
                  <SelectItem value="400">Regular</SelectItem>
                  <SelectItem value="500">Medium</SelectItem>
                  <SelectItem value="600">Semibold</SelectItem>
                  <SelectItem value="700">Bold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="text-color">Text Color</Label>
              <div className="flex gap-2">
                <Input
                  id="text-color"
                  type="color"
                  value={element.styles.color || "#000000"}
                  onChange={(e) => handleStyleChange("color", e.target.value)}
                  className="w-12 p-1 h-8"
                />
                <Input
                  type="text"
                  value={element.styles.color || "#000000"}
                  onChange={(e) => handleStyleChange("color", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="text-align">Text Align</Label>
              <Select 
                value={element.styles.textAlign || "left"} 
                onValueChange={(value) => handleStyleChange("textAlign", value)}
              >
                <SelectTrigger id="text-align">
                  <SelectValue placeholder="Select alignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="justify">Justify</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {element.type === "button" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="bg-color">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="bg-color"
                  type="color"
                  value={element.styles.backgroundColor || "#3B82F6"}
                  onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                  className="w-12 p-1 h-8"
                />
                <Input
                  type="text"
                  value={element.styles.backgroundColor || "#3B82F6"}
                  onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="padding">Padding</Label>
              <Input
                id="padding"
                value={element.styles.padding || ""}
                onChange={(e) => handleStyleChange("padding", e.target.value)}
                placeholder="8px 16px"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="border-radius">Border Radius</Label>
              <Input
                id="border-radius"
                value={element.styles.borderRadius || ""}
                onChange={(e) => handleStyleChange("borderRadius", e.target.value)}
                placeholder="4px"
              />
            </div>
          </>
        )}

        {element.type === "image" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                value={element.styles.width || ""}
                onChange={(e) => handleStyleChange("width", e.target.value)}
                placeholder="100%"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                value={element.styles.height || ""}
                onChange={(e) => handleStyleChange("height", e.target.value)}
                placeholder="auto"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="object-fit">Object Fit</Label>
              <Select 
                value={element.styles.objectFit || "cover"} 
                onValueChange={(value) => handleStyleChange("objectFit", value)}
              >
                <SelectTrigger id="object-fit">
                  <SelectValue placeholder="Select fit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contain">Contain</SelectItem>
                  <SelectItem value="cover">Cover</SelectItem>
                  <SelectItem value="fill">Fill</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="border-radius">Border Radius</Label>
              <Input
                id="border-radius"
                value={element.styles.borderRadius || ""}
                onChange={(e) => handleStyleChange("borderRadius", e.target.value)}
                placeholder="4px"
              />
            </div>
          </>
        )}

        {element.type === "container" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="bg-color">Background Color</Label>
              <div className="flex gap-2">
                <Input
                  id="bg-color"
                  type="color"
                  value={element.styles.backgroundColor || "#FFFFFF"}
                  onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                  className="w-12 p-1 h-8"
                />
                <Input
                  type="text"
                  value={element.styles.backgroundColor || "#FFFFFF"}
                  onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="padding">Padding</Label>
              <Input
                id="padding"
                value={element.styles.padding || ""}
                onChange={(e) => handleStyleChange("padding", e.target.value)}
                placeholder="16px"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="border">Border</Label>
              <Input
                id="border"
                value={element.styles.border || ""}
                onChange={(e) => handleStyleChange("border", e.target.value)}
                placeholder="1px solid #E5E7EB"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="border-radius">Border Radius</Label>
              <Input
                id="border-radius"
                value={element.styles.borderRadius || ""}
                onChange={(e) => handleStyleChange("borderRadius", e.target.value)}
                placeholder="8px"
              />
            </div>
          </>
        )}
      </div>
    );
  }

  if (type === "advanced") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="margin">Margin</Label>
          <Input
            id="margin"
            value={element.styles.margin || ""}
            onChange={(e) => handleStyleChange("margin", e.target.value)}
            placeholder="8px"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="position-x">X Position</Label>
          <Input
            id="position-x"
            type="number"
            value={element.position.x}
            onChange={(e) => {
              // This is handled separately since position is not part of styles
            }}
            disabled
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="position-y">Y Position</Label>
          <Input
            id="position-y"
            type="number"
            value={element.position.y}
            onChange={(e) => {
              // This is handled separately since position is not part of styles
            }}
            disabled
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="z-index">Z-Index</Label>
          <Input
            id="z-index"
            type="number"
            value={element.styles.zIndex || ""}
            onChange={(e) => handleStyleChange("zIndex", e.target.value)}
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="custom-class">Custom Class</Label>
          <Input
            id="custom-class"
            placeholder="my-custom-class"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="custom-id">Custom ID</Label>
          <Input
            id="custom-id"
            placeholder="my-custom-id"
          />
        </div>
      </div>
    );
  }

  return null;
}