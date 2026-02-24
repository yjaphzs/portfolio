import React from "react";

interface Props {
    children?: React.ReactNode;
}

function Content({ children }: Props) {
    return <div id="content-viewer">{children}</div>;
}

export default Content;
