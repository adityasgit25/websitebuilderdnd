import { Template } from "./types";

export const defaultTemplates: Template[] = [
  {
    id: "blank",
    name: "Blank",
    thumbnail: "https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=300",
    elements: []
  },
  {
    id: "business",
    name: "Business",
    thumbnail: "https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=300",
    elements: [
      {
        id: "header",
        type: "container",
        position: { x: 0, y: 0 },
        styles: {
          width: "100%",
          padding: "24px",
          backgroundColor: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center"
        },
        content: "",
        children: ["header-title", "header-subtitle"]
      },
      {
        id: "header-title",
        type: "heading",
        position: { x: 0, y: 0 },
        styles: {
          fontFamily: "Inter, sans-serif",
          fontSize: "40px",
          fontWeight: "700",
          color: "#111827",
          margin: "16px 0 8px"
        },
        content: "Professional Business Solutions"
      },
      {
        id: "header-subtitle",
        type: "paragraph",
        position: { x: 0, y: 50 },
        styles: {
          fontFamily: "Inter, sans-serif",
          fontSize: "18px",
          fontWeight: "400",
          color: "#6B7280",
          maxWidth: "600px",
          margin: "8px 0 24px"
        },
        content: "We provide cutting-edge business solutions to help your company grow and succeed in today's competitive market."
      }
    ]
  },
  {
    id: "portfolio",
    name: "Portfolio",
    thumbnail: "https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=300",
    elements: [
      {
        id: "hero",
        type: "container",
        position: { x: 0, y: 0 },
        styles: {
          width: "100%",
          minHeight: "500px",
          padding: "64px 24px",
          backgroundColor: "#F9FAFB",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center"
        },
        content: "",
        children: ["hero-title", "hero-subtitle", "hero-button"]
      },
      {
        id: "hero-title",
        type: "heading",
        position: { x: 0, y: 0 },
        styles: {
          fontFamily: "Inter, sans-serif",
          fontSize: "48px",
          fontWeight: "800",
          color: "#111827",
          margin: "0 0 16px"
        },
        content: "John Doe - Creative Portfolio"
      },
      {
        id: "hero-subtitle",
        type: "paragraph",
        position: { x: 0, y: 60 },
        styles: {
          fontFamily: "Inter, sans-serif",
          fontSize: "20px",
          fontWeight: "400",
          color: "#4B5563",
          maxWidth: "600px",
          margin: "0 0 32px"
        },
        content: "UX Designer & Front-end Developer based in San Francisco, specialized in creating beautiful digital experiences."
      },
      {
        id: "hero-button",
        type: "button",
        position: { x: 0, y: 150 },
        styles: {
          fontFamily: "Inter, sans-serif",
          fontSize: "16px",
          fontWeight: "500",
          color: "#FFFFFF",
          backgroundColor: "#4F46E5",
          padding: "12px 24px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer"
        },
        content: "View My Work"
      }
    ]
  }
];