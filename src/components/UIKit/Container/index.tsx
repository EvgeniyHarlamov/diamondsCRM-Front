import React, {CSSProperties} from "react";
import styles from "./styles.module.scss";

type PropsT = {
    style?: CSSProperties
    mobileFull?: true
    children?: React.ReactNode
}

function Container ({children, style, mobileFull}:PropsT) {
    return (
    <div className={`${styles.container} ${mobileFull ? styles.mobileFull : ''}`} style={style}>
        {children}
    </div>);
}

export default Container;