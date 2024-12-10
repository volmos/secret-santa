import {ButtonHTMLAttributes, useEffect, useState} from "react";
import {cn} from "@/lib/tailwindUtil";
import LoadingSpinner from "@/components/LoadingSpinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    onClickWithLoading?: () => Promise<void>;
}

export default function Button(props: ButtonProps) {
    const {children, className, loading, onClickWithLoading, ...buttonProps} = props;
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
                className={cn('bg-primary active:bg-primary-light text-white px-6 py-3 rounded-3xl uppercase text-xs font-medium', className)}>
            {loading === true ? <LoadingSpinner/> : children}
        </button>
    );
}