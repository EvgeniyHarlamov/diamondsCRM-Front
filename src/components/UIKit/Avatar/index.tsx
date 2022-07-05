
import React, { CSSProperties, useEffect, useState } from 'react';
import formatClientName from '../../../utils/format/formatClientName';
import styles from './styles.module.scss';

interface PropsT {
    value?: string | number
    showSignature?: true,
    style?: CSSProperties
    colorSet?: {
        color: string,
        backgroundColor: string
    },
    fontSize?: string,
    height?: string,
    fullName?: true,
    logoFontSize?: string,
    className?: string,
    logoClass?: string
    isNum?: true
}

function Avatar({value, colorSet, showSignature, fontSize = '12px',
height="24px", logoFontSize= '12px',fullName, className, style,logoClass, isNum}: PropsT) {
    const [color, setColor] = useState(
        {
            color: '#EC9A29',
            backgroundColor:'rgba(236,154,41,0.1)'
        }
    );


    if (value || (value && isNum && value > 0)) {
        let wordsInValue: number;
        let secondWord: string = '';
        if (typeof(value) === 'string') {
            wordsInValue = value.split(' ').length;
            secondWord = wordsInValue > 1 ? value.split(' ')[1].toUpperCase()[0] : '';
        }
        return(
            <div className={`${styles.avatarContainer} ${className ? className : ''}`} style={style}>
                <div
                    className={`${styles.logo} ${logoClass ? logoClass : ''}`}
                    style={
                        {
                            color: color.color,
                            backgroundColor: color.backgroundColor,
                            height: height,
                            fontSize: logoFontSize,
                        }
                    }>
                    {typeof(value) === 'string' ? value[0].toUpperCase() + secondWord : value}
                </div>
                {
                    showSignature ?
                        <span className={styles.name} style={{fontSize: fontSize}}>
                            {(fullName && typeof(value) === 'string') ? value : formatClientName(String(value))}
                        </span> : ''
                }
            </div>
        )
    }
    return (<div></div>);
}

export default Avatar;