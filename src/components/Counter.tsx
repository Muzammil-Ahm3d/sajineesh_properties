import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CounterProps {
    value: string;
    duration?: number;
    className?: string;
}

export const Counter: React.FC<CounterProps> = ({
    value,
    duration = 2,
    className
}) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [displayValue, setDisplayValue] = useState(0);

    // Extract number and suffix (e.g., "100+" -> 100 and "+")
    const numericValue = parseInt(value.replace(/[^0-9]/g, '') || '0', 10);
    const prefix = value.match(/^[^0-9]*/) ? value.match(/^[^0-9]*/)![0] : '';
    const suffix = value.match(/[^0-9]*$/) ? value.match(/[^0-9]*$/)![0] : '';

    useEffect(() => {
        if (isInView) {
            let startTime: number;
            let animationFrame: number;

            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

                // Easing function (easeOutExpo)
                const easeOut = (x: number): number => {
                    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
                };

                const currentCount = Math.floor(easeOut(progress) * numericValue);
                setDisplayValue(currentCount);

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(animate);
                }
            };

            animationFrame = requestAnimationFrame(animate);

            return () => cancelAnimationFrame(animationFrame);
        }
    }, [isInView, numericValue, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}{displayValue}{suffix}
        </span>
    );
};
