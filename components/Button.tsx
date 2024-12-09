import {ButtonHTMLAttributes, ReactNode} from "react";
import {cn} from "@/lib/tailwindUtil";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode | ReactNode[]
}

export default function Button(props: ButtonProps) {
    const {children, className, ...buttonProps} = props;
    return (
        <button {...buttonProps}
                className={cn('bg-primary text-white px-6 py-3 rounded-3xl uppercase text-xs font-medium', className)}>{children}</button>
    );
}