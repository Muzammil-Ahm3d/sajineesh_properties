import React from 'react';
import { cn } from '@/lib/utils';

interface PulsingBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const PulsingBadge: React.FC<PulsingBadgeProps> = ({ children, className }) => {
  return (
    <span 
      className={cn(
        'inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium',
        'animate-subtle-pulse',
        className
      )}
    >
      {children}
    </span>
  );
};
