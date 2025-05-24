import React from "react";

interface Props {
    children?: React.ReactNode;
    className?: string;
    href?: string;
}

function ButtonLink({ children, className, href }: Props) {
    return (
        <a
            className={`contact-btn ${className || ""}`}
            href={href ?? "#"}
            rel="noopener noreferrer"
            target="_blank"
        >
            {children}
        </a>
    );
}

export default ButtonLink;
