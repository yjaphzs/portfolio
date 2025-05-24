import React from "react";

interface Props {
    children?: React.ReactNode;
    className?: string;
    href?: string;
}

function Link({ children, className, href }: Props) {
    return (
        <a className={`text-link ${className || ""}`} href={href ?? "#"}>
            {children}
        </a>
    );
}

export default Link;
