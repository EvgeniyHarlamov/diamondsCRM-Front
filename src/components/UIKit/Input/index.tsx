import {CSSProperties} from "react";
import styles from "./styles.module.scss";
import InputMask from 'react-input-mask';

type PropsT = {
    type?: string,
    name?: string,
    id?: string,
    classes?: string,
    style?: CSSProperties
    placeholder?: string,
    value?: string,
    icon?: string,
    label?: string,
    onChange?: (e:any) => void
    pattern?: string
    mask?: any
    wrapperClasses?: string
    disabled?: boolean
}

function Input ({type, name, id, placeholder, value, classes, style, icon, onChange, label, pattern, mask, wrapperClasses, disabled = false}: PropsT)  {
    if (icon) {
        return (
            <div className={wrapperClasses ? wrapperClasses : ''}>
            {label && <label className={'label'} htmlFor={name}>{label}</label>}
            <div className={styles.InnerAddon} style={style}>
                {!mask ? <input
                        type={type ? type : "text"}
                        className={`${styles.input} ${classes ? classes : ''}`}
                        name={name}
                        onChange={onChange}
                        id={id}
                        placeholder={placeholder}
                        defaultValue={value}
                        pattern={pattern}
                        disabled={disabled}
                /> : <InputMask
                        type={type ? type : "text"}
                        className={`${styles.input} ${classes ? classes : ''}`}
                        style={style}
                        name={name}
                        onChange={onChange}
                        id={id}
                        placeholder={placeholder}
                        defaultValue={value}
                        disabled={disabled}
                        mask={mask}
                />}
                <div className={styles.imgWrapper}>
                    <div className={styles.imgContainer}>
                        <img role="img" src={icon}/>
                    </div>
                </div>
            </div>
            </div>
        )
    }
    return (
        <div className={wrapperClasses ? wrapperClasses : ''}>
        {label && <label className={'label'} htmlFor={name}>{label}</label>}
        {!mask ? <input
                type={type ? type : "text"}
                className={`${styles.input} ${classes ? classes : ''}`}
                style={style}
                name={name}
                onChange={onChange}
                id={id}
                placeholder={placeholder}
                defaultValue={value}
                disabled={disabled}
        /> : <InputMask
                type={type ? type : "text"}
                className={`${styles.input} ${classes ? classes : ''}`}
                style={style}
                name={name}
                onChange={onChange}
                id={id}
                placeholder={placeholder}
                defaultValue={value}
                mask={mask}
                disabled={disabled}
    />}
        </div>
    );
}

export default Input;