import React from "react";

interface Props {
    children?: React.ReactNode;
    id: string;
    className?: string;
}

function Division({ children, id, className }: Props) {
    return (
        <div id={id} className={`division ${className || ""}`}>
            {children}
        </div>
    );
}

export default Division;
