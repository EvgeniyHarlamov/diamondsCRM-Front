import React, { useEffect, useState } from 'react';
import generateID from '../../../utils/generateID';
import styles from './styles.module.scss';

type PropsT = {
    buttons: Array<string>
    defaultValue?: string
    handleValueChange?: (value: string | undefined) => void
    className?: string,
    label?: string
}

function ButtonsMenu({buttons, defaultValue, handleValueChange, className, label}:PropsT) {
    const [activeButtonValue, setActiveButtonValue] = useState('' || defaultValue);

    useEffect(() => {
        if (handleValueChange) handleValueChange(activeButtonValue);
    }, [activeButtonValue]);

    return(
        <>
        {label && <div className={styles.label}>{label}</div>}
        <div className={styles.buttonsWrapper + ` ${className ? className : ''}`}>
            {buttons.map((button) => {
                return <div
                    className={activeButtonValue !== button? styles.buttonInactive : styles.buttonActive}
                    key = {generateID()}
                    onClick={() => {setActiveButtonValue(button)}}
                >
                    {button}
                </div>
            })}
        </div>
        </>
    )
}

export default ButtonsMenu;