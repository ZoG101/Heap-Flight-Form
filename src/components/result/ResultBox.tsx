import { CSSProperties, ReactNode } from "react";

interface ResultBoxProps {
    children?:ReactNode,
    css?:CSSProperties
}

const ResultBox = (props:ResultBoxProps) => {
    return(
        <div className="result-box" style={props.css}>
            {props.children}
        </div>
    );
}

export default ResultBox;