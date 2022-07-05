import React from 'react';
import styles from './styles.module.scss';

type PropsT = {
    isOpen: boolean,
    children?: React.ReactNode
    onClick: () => void
}

function Popup ({children, isOpen, onClick}:PropsT)  {

    return (
    <>
        <div className={styles.overlay} style={{display: isOpen ? 'block' : 'none'}} onClick={onClick}/>
        {children}
    </>
    );
}

export default Popup;