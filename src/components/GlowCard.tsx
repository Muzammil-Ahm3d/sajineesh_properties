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
        'border border-white/15',
        'hover:border-neon-glow hover:shadow-neon',
        variant === 'dark' && 'bg-green-dark text-white',
        variant === 'default' && 'bg-card',
        className
      )}
    >
      {children}
    </div>
  );
};
