import React, { useState, useEffect } from 'react';
import { GridLayout } from './components/GridLayout';
import { ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger animation as soon as user starts scrolling
      const threshold = 30; 
      setShowGrid(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Scroll Track: Taller than viewport to allow "scrolling" interaction
    // which triggers the internal state change without moving the fixed viewport.
    <main className="relative h-[150vh] w-full bg-gray-50">
      
      {/* Fixed Viewport Container: Everything visual happens inside here */}
      <div className="fixed inset-0 w-full h-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* Layer 1: Hero / Header 
            Stays centered but fades/blurs/shrinks when the grid appears.
        */}
        <header className={`
            absolute inset-0 flex flex-col items-center justify-center z-0
            transition-all duration-1000 cubic-bezier(0.7, 0, 0.3, 1)
            ${showGrid ? 'opacity-0 blur-md scale-90 translate-y-[-50px]' : 'opacity-100 scale-100 translate-y-0'}
        `}>
          <div className="text-center px-4 max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-neutral-900">
              Design<span className="text-blue-600">Suite</span>
            </h1>
            <p className="text-xl md:text-3xl text-neutral-500 font-medium tracking-tight">
              Ten essential tools. <span className="text-blue-500">One dashboard.</span>
            </p>
          </div>
        </header>

        {/* Scroll Hint */}
        <div className={`
            fixed bottom-10 left-1/2 -translate-x-1/2 text-neutral-400 
            transition-all duration-500 flex flex-col items-center gap-2
            ${showGrid ? 'opacity-0 translate-y-10' : 'opacity-100 animate-bounce'}
        `}>
          <span className="text-sm font-semibold tracking-widest uppercase">Scroll to Open</span>
          <ChevronDown size={20} />
        </div>

        {/* Layer 2: Grid Container 
            Overlays the header. Initially invisible/pointer-events-none.
            When active, it handles the layout of the tiles.
        */}
        <div className={`
            absolute inset-0 z-10 flex items-center justify-center 
            transition-all duration-500
            ${showGrid ? 'pointer-events-auto' : 'pointer-events-none'}
        `}>
          <div className="w-full h-full overflow-y-auto flex items-center justify-center no-scrollbar">
            {/* We pass the visibility state to trigger the individual tile animations */}
            <GridLayout isVisible={showGrid} />
          </div>
        </div>
      
      </div>
    </main>
  );
};

export default App;