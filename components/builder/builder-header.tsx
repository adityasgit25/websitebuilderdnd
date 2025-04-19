"use client"

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, ArrowRight, ChevronDown, LampDesk as Desktop, Eye, Laptop, MoreHorizontal, Save, Smartphone, Undo2, Redo2 } from "lucide-react";
import { useWebsiteBuilder } from "@/hooks/use-website-builder";
import Link from "next/link";

interface BuilderHeaderProps {
  onPreviewToggle: () => void;
  previewMode: boolean;
}

export function BuilderHeader({ onPreviewToggle, previewMode }: BuilderHeaderProps) {
  const { 
    selectedTemplate, 
    templates, 
    selectTemplate,
    undo,
    redo,
    canUndo,
    canRedo
  } = useWebsiteBuilder();

  return (
    <header className="border-b flex items-center h-14 px-4 lg:px-6 gap-4">
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <ArrowLeft className="h-4 w-4" />
          <span>Websites.co.in</span>
        </Link>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <div className="hidden sm:flex items-center gap-2 mr-4">
          <Button
            variant="outline"
            size="icon"
            disabled={!canUndo}
            onClick={() => undo()}
            title="Undo"
          >
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={!canRedo}
            onClick={() => redo()}
            title="Redo"
          >
            <Redo2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="hidden md:flex items-center gap-2 mr-4">
          <Button variant="outline" size="icon" title="Desktop View">
            <Desktop className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" title="Tablet View">
            <Laptop className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" title="Mobile View">
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              Template: {selectedTemplate.name}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {templates.map((template) => (
              <DropdownMenuItem 
                key={template.id}
                onClick={() => selectTemplate(template.id)}
              >
                {template.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button 
          variant="outline" 
          size="icon"
          onClick={onPreviewToggle}
          title={previewMode ? "Edit Mode" : "Preview Mode"}
        >
          {previewMode ? <ArrowLeft className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>

        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Publish</DropdownMenuItem>
            <DropdownMenuItem>Export</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}