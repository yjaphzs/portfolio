import React from "react";
import "./TextLink.scss";

interface Props {
    children?: React.ReactNode;
    className?: string;
    href?: string;
    download?: boolean | string;
}

function TextLink({ children, className, download, href }: Props) {
    return (
        <a
            href={href}
            download={download ? download : true}
            target="_blank"
            className={`text-link ${className || ""}`}
        >
            {children}
        </a>
    );
}

export default TextLink;
