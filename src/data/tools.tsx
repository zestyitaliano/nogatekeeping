import React from 'react';
import { Tool } from '../types';
import { 
  Pipette, 
  Type, 
  Scaling, 
  FileText, 
  Minimize2, 
  Palette, 
  Grid, 
  Heart,
  Star,
  Cloud,
  GitGraph, 
  Layout 
} from 'lucide-react';

// Composite icon for "Three small, distinct icons"
const IconLibraryGraphic = () => (
  <div className="flex gap-1">
    <Heart size={28} strokeWidth={2} fill="currentColor" className="opacity-80" />
    <Star size={28} strokeWidth={2} fill="currentColor" className="opacity-100 -mt-2" />
    <Cloud size={28} strokeWidth={2} fill="currentColor" className="opacity-80" />
  </div>
);

// Colors provided:
// #1982c4 (Blue)
// #ff595e (Red/Coral)
// #ffca3a (Yellow)
// #6a4c93 (Purple)
// #8ac926 (Green)
// #5dcbf0 (Cyan)
// #202c39 (Dark Blue/Black)
// #efefef (Light Gray)

export const TOOLS: Tool[] = [
  {
    id: 1,
    title: "Color Picker from Image",
    description: "Extract exact colors from any photo instantly.",
    icon: <Pipette size={48} strokeWidth={1.5} />,
    bgColor: "bg-[#1982c4]", // Blue (Primary) - 2x2 Block
    textColor: "text-white",
    gridClass: "col-span-1 md:col-span-2 md:row-span-2",
    href: "#color-picker"
  },
  {
    id: 2,
    title: "Case Converter",
    description: "Transform text casing easily.",
    icon: <Type size={48} strokeWidth={1.5} />,
    bgColor: "bg-[#5dcbf0]", // Cyan
    textColor: "text-[#202c39]", // Dark text
    gridClass: "col-span-1 md:col-span-1 md:row-span-1",
    href: "#case-converter"
  },
  {
    id: 3,
    title: "Proportion Scaler",
    description: "Calculate aspect ratios.",
    icon: <Scaling size={48} strokeWidth={1.5} />,
    bgColor: "bg-[#202c39]", // Dark
    textColor: "text-white", 
    gridClass: "col-span-1 md:col-span-1 md:row-span-1",
    href: "#proportion-scaler"
  },
  {
    id: 4,
    title: "Image to Text Converter",
    description: "OCR extraction for your documents.",
    icon: <FileText size={48} strokeWidth={1.5} />,
    bgColor: "bg-[#8ac926]", // Green
    textColor: "text-[#202c39]", // Dark text
    gridClass: "col-span-1 md:col-span-1 md:row-span-2",
    href: "#image-to-text"
  },
  {
    id: 5,
    title: "Image Compressor",
    description: "Reduce file size without losing quality.",
    icon: <Minimize2 size={48} strokeWidth={1.5} />,
    bgColor: "bg-[#6a4c93]", // Purple
    textColor: "text-white", 
    gridClass: "col-span-1 md:col-span-1 md:row-span-1",
    href: "#image-compressor"
  },
  {
    id: 6,
    title: "Color Palette Generator",
    description: "Create harmonious color schemes.",
    icon: <Palette size={48} strokeWidth={1.5} />,
    bgColor: "bg-[#ff595e]", // Red (Primary) - Wide Block
    textColor: "text-white", 
    gridClass: "col-span-1 md:col-span-2 md:row-span-1",
    href: "#palette-generator"
  },
  {
    id: 7,
    title: "Vector Pattern Generator",
    description: "Seamless geometric backgrounds.",
    icon: <Grid size={48} strokeWidth={1.5} />,
    bgColor: "bg-[#efefef]", // Light Gray
    textColor: "text-[#202c39]", // Dark text
    gridClass: "col-span-1 md:col-span-1 md:row-span-1",
    href: "#vector-pattern"
  },
  {
    id: 8,
    title: "SVG Icon Library",
    description: "Thousands of open source icons.",
    icon: <IconLibraryGraphic />, 
    bgColor: "bg-[#ffca3a]", // Yellow (Primary) - Wide Block
    textColor: "text-[#202c39]", // Dark text
    gridClass: "col-span-1 md:col-span-2 md:row-span-1",
    href: "#icon-library"
  },
  {
    id: 9,
    title: "Site Map Extractor",
    description: "Visualize website structure.",
    icon: <GitGraph size={48} strokeWidth={1.5} />,
    bgColor: "bg-[#1982c4]", // Blue Reuse
    textColor: "text-white",
    gridClass: "col-span-1 md:col-span-1 md:row-span-1",
    href: "#sitemap-extractor"
  },
  {
    id: 10,
    title: "Wireframe Modeler",
    description: "Rapid low-fidelity prototyping.",
    icon: <Layout size={48} strokeWidth={1.5} />,
    bgColor: "bg-[#ff595e]", // Red Reuse
    textColor: "text-white",
    gridClass: "col-span-1 md:col-span-1 md:row-span-1",
    href: "#wireframe-modeler"
  }
];