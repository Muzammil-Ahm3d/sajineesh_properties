import React from 'react';
import { cn } from '@/lib/utils';

interface ImageCardProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'video' | 'square' | 'portrait';
}

export const ImageCard: React.FC<ImageCardProps> = ({ 
  src, 
  alt, 
  className,
  aspectRatio = 'video'
}) => {
  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]'
  };

  return (
    <div className={cn('image-hover-zoom rounded-lg', aspectClasses[aspectRatio], className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
