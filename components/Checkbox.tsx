import { InputHTMLAttributes } from 'react';
import { cn } from "@/lib/tailwindUtil";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default function Checkbox({ className, label, ...props }: CheckboxProps) {
    return (
        <label className={cn("flex items-center gap-3 cursor-pointer group select-none", className)}>
            <div className="relative flex items-center justify-center">
                <input
                    type="checkbox"
                    className="peer appearance-none w-6 h-6 border-2 border-primary/40 rounded-lg bg-white checked:bg-primary checked:border-primary transition-all duration-200 cursor-pointer"
                    {...props}
                />
                <svg
                    className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200 pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </div>
            {label && (
                <span className="text-lg text-primary font-medium group-hover:text-primary-dark transition-colors">
                    {label}
                </span>
            )}
        </label>
    );
}
