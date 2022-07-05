import {CSSProperties} from 'react';
import styles from "./styles.module.scss";

type PropsT = {
    style?: CSSProperties
}

function Separator ({style}:PropsT) {
    return(
        <div className={styles.line} style={style}/>
    );
}

export default Separator;