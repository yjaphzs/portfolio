import React from "react";

interface Props {
    children?: React.ReactNode;
    id?: string;
    className?: string;
    color: string;
}

function Card({ children, id, className, color }: Props) {
    return (
        <div
            {...(id ? { id } : {})}
            className={`fullscreen ${className || ""}`}
        >
            <div className="section" data-color={color}>
                <div className="wrapper">{children}</div>
            </div>
        </div>
    );
}

export default Card;
