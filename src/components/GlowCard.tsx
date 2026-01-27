import React from 'react';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'dark';
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className,
  variant = 'default'
}) => {
  return (
    <div
      className={cn(
        'rounded-xl transition-all duration-300',
        'border border-border/50 bg-gray-50/80 backdrop-blur-sm',
        'hover:border-neon-glow hover:shadow-neon hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  );
};
