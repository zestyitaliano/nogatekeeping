import React from "react";
import { Tool } from "../types/tools";

// Icons
import {
  Palette,
  Pipette,
  Type,
  Minimize2,
  Image as ImageIcon,
  Code,
  LayoutGrid,
  PenTool,
  Boxes,
} from "lucide-react";

export const TOOLS: Tool[] = [
  {
    id: 1,
    title: "Color Palette Generator",
    description: "Generate palettes, gradients, mockups, and recolors.",
    icon: <Palette size={48} strokeWidth={1.5} />,
    bgColor: "bg-orange-500",
    textColor: "text-white",
    gridClass: "col-span-1 md:col-span-2 md:row-span-2",
    href: "/tools/palette/index.html", // ✔ working
  },

  {
    id: 2,
    title: "Color Picker from Image",
    description: "Extract colors instantly from any uploaded image.",
    icon: <Pipette size={48} strokeWidth={1.5} />,
    bgColor: "bg-fuchsia-700",
    textColor: "text-white",
    gridClass: "col-span-1 md:col-span-1 md:row-span-1",
    href: "/src/pages/color-picker/color-picker.html", // ✔ working
  },

  {
    id: 3,
    title: "Case Converter",
    description: "Convert text to UPPERCASE, lowercase, or Title Case.",
    icon: <Type size={48} strokeWidth={1.5} />,
    bgColor: "bg-lime-500",
    textColor: "text-neutral-900",
    gridClass: "col-span-1 md:col-span-1 md:row-span-1",
    href: "/src/pages/case-converter/case-converter.html", // ✔ working
  },

  {
    id: 4,
    title: "Image Compressor",
    description: "Compress images for sharing and web optimization.",
    icon: <Minimize2 size={48} strokeWidth={1.5} />,
    bgColor: "bg-blue-600",
    textColor: "text-white",
    gridClass: "col-span-1 md:col-span-1 md:row-span-2",
    href: "/src/pages/image-compressor/image-compressor.html", // ✔ working
  },

  {
    id: 5,
    title: "Image to Text (OCR)",
    description: "Extract readable text from any image.",
    icon: <ImageIcon size={48} strokeWidth={1.5} />,
    bgColor: "bg-amber-500",
    textColor: "text-white",
    gridClass: "col-span-1 md:col-span-1 md:row-span-1",
    href: "/src/pages/image-to-text/image-to-text.html", // ✔ working
  },

  // ───────────────────────────────
  //    FUTURE TOOLS (COMING SOON)
  // ───────────────────────────────

  {
    id: 6,
    title: "Sitemap Explorer (Coming Soon)",
    description: "Visualize and crawl website sitemap structures.",
    icon: <LayoutGrid size={48} strokeWidth={1.5} />,
    bgColor: "bg-indigo-600",
    textColor: "text-white",
    gridClass: "col-span-1 md:col-span-1 md:row-span-1",
    href: "#", // coming soon
  },

  {
    id: 7,
    title: "Pattern Generator (Coming Soon)",
    description: "Create dynamic, exportable SVG pattern systems.",
    icon: <PenTool size={48} strokeWidth={1.5} />,
    bgColor: "bg-rose-600",
    textColor: "text-white",
    gridClass: "col-span-1 md:col-span-2 md:row-span-1",
    href: "#", // coming soon
  },

  {
    id: 8,
    title: "Wireframe Generator (Coming Soon)",
    description: "Auto-generate lo-fi wireframes and layouts.",
    icon: <Boxes size={48} strokeWidth={1.5} />,
    bgColor: "bg-slate-700",
    textColor: "text-white",
    gridClass: "col-span-1 md:col-span-2 md:row-span-1",
    href: "#", // coming soon
  },

  {
    id: 9,
    title: "SVG Icon Library (Coming Soon)",
    description: "Search, recolor, and download clean SVG icons.",
    icon: <Code size={48} strokeWidth={1.5} />,
    bgColor: "bg-neutral-900",
    textColor: "text-white",
    gridClass: "col-span-1 md:col-span-1 md:row-span-1",
    href: "#", // coming soon
  },
];
