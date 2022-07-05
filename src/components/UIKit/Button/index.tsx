import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';

type PropsT = {
    onClick?: (e: any) => void
    color?: 'green' | 'default'
    width?: string
    padding?: string
    margin?: string
    height?: string
    className?: string
    borderRadius?: string
    type?: "button" | "submit" | "reset" | undefined
    children?: React.ReactNode
}

function Button ({onClick, children, color = 'default', width = "100%", height = "100%", padding, margin, className, borderRadius, type}:PropsT) {
    const [buttonStyle, setButtonStyle] = useState(styles.defaultButton);

    useEffect(() => {
        if (color === 'green') {
            setButtonStyle(styles.greenButton)
        }
    }, [])

    return (
        <button
            onClick={onClick}
            className={buttonStyle + ` ${className ? className : ''}`}
            type={type}
            style={{
                width: width,
                padding: padding,
                margin: margin,
                height: height,
                borderRadius: borderRadius
            }}
            >
        {children}
        </button>
    );
}

export default Button;