import { CSSProperties, ReactNode } from "react";

interface MainBoxProps {
    children?:ReactNode,
    css?:CSSProperties
}

const MainBox = (props:MainBoxProps) => {
    return(
        <div className="main-box" style={props.css}>
            {props.children}
        </div>
    );
}

export default MainBox;