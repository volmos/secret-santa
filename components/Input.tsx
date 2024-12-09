import {InputHTMLAttributes} from "react";
import {cn} from "@/lib/tailwindUtil";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
    const {className, ...inputProps} = props;
    return (
        <input {...inputProps}
               className={cn('border border-primary text-primary bg-background px-4 py-2 rounded-3xl', className)}/>
    );
}