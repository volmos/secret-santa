import { HTMLAttributes } from "react";
import { cn } from "@/lib/tailwindUtil";

type ParagraphProps = HTMLAttributes<HTMLParagraphElement>;

export default function Paragraph(props: ParagraphProps) {
    const { children, className, ...pProps } = props;
    return (
        <p className={cn('text-lg text-primary/80 font-medium leading-relaxed', className)} {...pProps} >{children}</p>
    );
}