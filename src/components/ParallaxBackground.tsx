import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxBackgroundProps {
  imageSrc: string;
  children: React.ReactNode;
  className?: string;
  overlayOpacity?: number;
}

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  imageSrc,
  children,
  className,
  overlayOpacity = 0.85,
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cn('relative min-h-screen overflow-hidden', className)}>
      {/* Parallax Background Image */}
      <div 
        className="absolute inset-0 w-full h-[120%]"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${scrollY * 0.3}px)`,
          willChange: 'transform',
        }}
      />
      
      {/* Dark Green Overlay */}
      <div 
        className="absolute inset-0 bg-green-dark"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
