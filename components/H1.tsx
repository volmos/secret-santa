import {HTMLAttributes} from "react";
import {cn} from "@/lib/tailwindUtil";

type H1Props = HTMLAttributes<HTMLHeadingElement>;

export default function H1(props: H1Props) {
    const {children, className, ...h1Props} = props;
    return (
        <h1 {...h1Props}
            className={cn('text-4xl text-secondary font-[family-name:var(--font-yeseva)]', className)}>{children}</h1>
    );
}