import React from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  className,
  delay = 0 
}) => {
  const { ref, isRevealed } = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        isRevealed 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
