import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/tailwindUtil";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
    const { className, ...inputProps } = props;
    return (
        <input {...inputProps}
            className={cn(
                'w-full bg-white/50 border-2 border-primary/20 focus:border-primary text-primary px-6 py-4 rounded-xl outline-none transition-all duration-200 placeholder:text-primary/40 font-medium',
                className
            )} />
    );
}