import React from "react";
import "./TextLink.scss";

interface Props {
    children?: React.ReactNode;
    className?: string;
    href?: string;
}

function TextLink({ children, className, href }: Props) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-link ${className || ""}`}
        >
            {children}
        </a>
    );
}

export default TextLink;
