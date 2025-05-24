import React from "react";
import "./TextLink.scss";

interface Props {
    children?: React.ReactNode;
    className?: string;
    href?: string;
}

function TextLink({ children, className, href }: Props) {
    return (
        <a className={`text-link ${className || ""}`} href={href ?? "#"}>
            {children}
        </a>
    );
}

export default TextLink;
