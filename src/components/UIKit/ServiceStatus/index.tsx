import React, { useEffect, useState } from 'react';
import Select from '../Select';
import styles from './styles.module.scss';

type IconT = {
    src: string,
    styles?: {
        height?: string,
        width?: string
    }
}

type PropsT = {
    service: string,
    icon?: IconT
}

function ServiceStatus({service, icon}:PropsT) {

    const [colorStyle, setColorStyle] = useState('');
    const [iconProps, setIconProps] = useState<IconT | undefined>(icon);
    const handleServiceName = (value: string) => {
        if (value === 'free') return 'Бесплатные услуги';
        if (value === 'vip') return 'VIP';
        if (value === 'pay') return 'Платные услуги';
        if (value === 'paid') return 'Оплачено';

    }
    useEffect(() => {
        if (service === 'free' || service === 'Бесплатные услуги') setColorStyle(styles.free);
        if (service === 'vip' || service === 'VIP') setColorStyle(styles.vip);
        if (service === 'pay' || service === 'Платные услуги') setColorStyle(styles.onPay);
        if (service === 'paid' || service === 'Оплачено') setColorStyle(styles.paid);
    }, [service]);

    return(
        <div className={styles.service + ` ${colorStyle}`}>
            {handleServiceName(service)}
            {icon &&
                <span className={styles.icon}>
                    <img style={iconProps ? iconProps.styles : {}} src={iconProps ? iconProps.src : ''}/>
                </span>}
        </div>
    )
}



export default ServiceStatus;