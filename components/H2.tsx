import {HTMLAttributes} from "react";
import {cn} from "@/lib/tailwindUtil";

type H2Props = HTMLAttributes<HTMLHeadingElement>;

export default function H2(props: H2Props) {
    const {children, className, ...h1Props} = props;
    return (
        <h2 {...h1Props}
            className={cn('text-xl text-primary font-[family-name:var(--font-monserrat)] uppercase font-semibold', className)}>{children}</h2>
    );
}