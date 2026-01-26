import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TypingAnimationProps {
  text: string;
  className?: string;
  speed?: 'slow' | 'medium' | 'fast';
  delay?: number;
}

export const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  className,
  speed = 'medium',
  delay = 0,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const speeds = {
    slow: 80,
    medium: 50,
    fast: 30,
  };

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speeds[speed]);

    return () => clearInterval(interval);
  }, [text, speed, hasStarted]);

  return (
    <span className={cn('', className)}>
      {displayedText}
      {!isComplete && hasStarted && (
        <span className="animate-pulse ml-0.5 inline-block w-[3px] h-[1em] bg-current align-middle" />
      )}
    </span>
  );
};
