import React from 'react';
import { TOOLS } from '../data/tools';
import { ToolTile } from './ToolTile';

interface GridLayoutProps {
  isVisible: boolean;
}

export const GridLayout: React.FC<GridLayoutProps> = ({ isVisible }) => {
  return (
    <div className="w-full max-w-[1800px] mx-auto p-4 md:p-8">
      {/* 
        Grid Definition:
        - Mobile: 1 column
        - Desktop: 4 columns
        - Rows: Auto-sized to fit content
      */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
        {TOOLS.map((tool, index) => (
          <ToolTile 
            key={tool.id} 
            tool={tool} 
            index={index}
            isVisible={isVisible}
          />
        ))}
      </div>
    </div>
  );
};