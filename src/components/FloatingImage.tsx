import React from 'react';
import { cn } from '@/lib/utils';

interface FloatingImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const FloatingImage: React.FC<FloatingImageProps> = ({ src, alt, className }) => {
  return (
    <div className={cn('image-hover-zoom rounded-xl overflow-hidden', className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
