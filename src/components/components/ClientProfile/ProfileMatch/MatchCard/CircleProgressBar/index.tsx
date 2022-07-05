import React, { useEffect, useState, CSSProperties} from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { CircleProgressBarT, InfoCardRowT } from '../../../../../../types';
import styles from './styles.module.scss';

type PropsT = {
    item: InfoCardRowT
}

function CircleProgressBar({item}:PropsT) {
    const value = Number(item.value);

    const redStyle:CircleProgressBarT = {
        backgroundColor: 'rgba(225, 82, 82, 0.1)',
        textColor: '#E15252',
        trailColor: 'rgba(225, 82, 82,0)',
        pathColor: `#E15252`,
        textSize: '26px'
    }

    const greenStyle:CircleProgressBarT = {
        backgroundColor: 'rgba(91, 174, 78, 0.1)',
        textColor: '#5bae4e',
        trailColor: 'rgba(91, 174, 78, 0)',
        pathColor: `#5bae4e`,
        textSize: '26px'
    }

    const orangeStyle:CircleProgressBarT = {
        backgroundColor: 'rgba(236, 154, 41, 0.1)',
        textColor: '#ec9a29',
        trailColor: 'rgba(236, 154, 41, 0.1)',
        pathColor: `#ec9a29`,
        textSize: '26px'
    }


    const [colorStyle, setColorStyle] = useState<CircleProgressBarT>(redStyle);

    useEffect(() => {
        if (value < 50) setColorStyle(redStyle);
        if (value >= 50 && value < 90) setColorStyle(orangeStyle);
        if (value >= 90) setColorStyle(greenStyle)
    }, [])

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <CircularProgressbar
                    background={true}
                    value={value}
                    text={`${value}%`}
                    styles={buildStyles(colorStyle)}
                />
            </div>
        </div>
    )
}

export default CircleProgressBar;