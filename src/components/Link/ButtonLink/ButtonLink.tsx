import React from "react";
import "./ButtonLink.scss";

interface Props {
    children?: React.ReactNode;
    className?: string;
    href?: string;
}

function ButtonLink({ children, className, href }: Props) {
    return (
        <a
            className={`button-link ${className || ""}`}
            href={href ?? "#"}
            rel="noopener noreferrer"
            target="_blank"
        >
            {children}
        </a>
    );
}

export default ButtonLink;
