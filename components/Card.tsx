import { HTMLAttributes } from 'react';
import { cn } from "@/lib/tailwindUtil";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'white' | 'glass';
}

export default function Card({
    children,
    className,
    variant = 'white',
    ...props
}: CardProps) {
    const variants = {
        white: 'bg-white/90 shadow-card border-white/50 backdrop-blur-sm',
        glass: 'bg-white/40 shadow-floating border-white/30 backdrop-blur-md',
    };

    return (
        <div
            className={cn(
                'rounded-3xl border p-6 md:p-8 transition-all duration-300',
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
