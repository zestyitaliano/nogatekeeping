import React, { useMemo } from 'react';
import { Tool } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ToolTileProps {
  tool: Tool;
  index: number;
  isVisible: boolean;
}

export const ToolTile: React.FC<ToolTileProps> = ({ tool, index, isVisible }) => {
  // Animation delay: Staggered for sequential effect
  const animationDelay = `${index * 0.06}s`;

  // Determine if this is a standard 1x1 block based on its grid classes.
  // We use this to enforce aspect-ratio on the base units, which sets the row height for everyone else.
  const isSingleUnit = tool.gridClass.includes('md:col-span-1') && tool.gridClass.includes('md:row-span-1');

  // Logic: 
  // Mobile: Always 16:9 (aspect-video) for consistent card look.
  // Desktop: 
  //   - 1x1 units: Force 16:9 (md:aspect-video). This defines the grid row height.
  //   - Spanning units: Use auto aspect (md:aspect-auto) to fill the rows/cols defined by the grid.
  const aspectRatioClass = isSingleUnit 
    ? 'aspect-video' 
    : 'aspect-video md:aspect-auto';

  // Calculate dramatic entrance direction
  const style = useMemo(() => {
    // We want a "slide in from all sides" feel.
    // We'll distribute the entry points based on column/row logic approximation
    // using the index.
    
    let x = 0;
    let y = 0;
    const distance = 400; // Increased distance for "slide in" feel

    // Logic:
    // Index 0, 4, 8 (Leftish) -> Slide from Left
    // Index 3, 7 (Rightish) -> Slide from Right
    // Index 1, 2, 5, 6 -> Slide from Top or Bottom randomly
    
    const mod4 = index % 4;

    if (mod4 === 0) {
        x = -distance; // From Left
        y = 100;
    } else if (mod4 === 3) {
        x = distance; // From Right
        y = 100;
    } else if (mod4 === 1) {
        x = -100;
        y = distance; // From Bottom
    } else {
        x = 100;
        y = -distance; // From Top
    }

    // Add some randomness so it's not too robotic
    if (index % 5 === 0) y += 50;

    return {
      animationDelay,
      '--enter-x': `${x}px`,
      '--enter-y': `${y}px`,
    } as React.CSSProperties;
  }, [index]);

  return (
    <div 
      className={`
        ${tool.gridClass} 
        ${aspectRatioClass}
        ${isVisible ? 'animate-fly-in-multi' : 'opacity-0 translate-y-4'}
        transition-opacity duration-300 w-full
      `}
      style={style}
    >
      <a
        href={tool.href}
        className={`
          group relative block h-full w-full overflow-hidden p-6 md:p-8
          flex flex-col justify-between shadow-lg
          ${tool.bgColor} ${tool.textColor}
          hover:z-20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]
          cursor-pointer rounded-none
        `}
      >
        {/* Hover Highlight Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-300 bg-white pointer-events-none" />

        {/* Icon & Arrow Row */}
        <div className="flex justify-between items-start mb-4 md:mb-6">
          <div className="transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 origin-center">
            {tool.icon}
          </div>
          <div className="bg-white/20 p-2 rounded-none backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
             <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>

        {/* Text Content */}
        <div className="relative z-10 mt-auto transform transition-transform duration-500 group-hover:translate-x-1">
          <h2 className="text-xl md:text-3xl font-bold leading-tight tracking-tight mb-2">
            {tool.title}
          </h2>
          {tool.description && (
            <p className="text-sm opacity-80 font-medium md:max-w-[90%] leading-relaxed line-clamp-3 md:line-clamp-none">
              {tool.description}
            </p>
          )}
        </div>
      </a>
    </div>
  );
};