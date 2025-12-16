import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { cn } from "@/lib/tailwindUtil";
import LoadingSpinner from "@/components/LoadingSpinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    onClickWithLoading?: () => Promise<void>;
    variant?: 'primary' | 'secondary' | 'accent';
    size?: 'sm' | 'md' | 'lg';
}

export default function Button(props: ButtonProps) {
    const {
        children,
        className,
        loading,
        onClickWithLoading,
        variant = 'primary',
        size = 'md',
        ...buttonProps
    } = props;
    const [isLoading, setIsLoading] = useState(loading);
    useEffect(() => {
        setIsLoading(loading);
    }, [loading]);
    const onClick = onClickWithLoading ? async () => {
        setIsLoading(true);
        await onClickWithLoading();
        setIsLoading(false);
    } : buttonProps.onClick;
    return (
        <button disabled={isLoading}
            {...buttonProps}
            onClick={onClick}
            className={cn(
                'bg-primary hover:bg-primary-light active:bg-primary-dark text-white px-8 py-4 rounded-full uppercase text-sm font-bold tracking-wider shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2',
                className
            )}>
            {loading === true ? <LoadingSpinner /> : children}
        </button>
    );
}