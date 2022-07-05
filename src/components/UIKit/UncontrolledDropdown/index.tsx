import React, {CSSProperties, useEffect, useRef, useState} from "react";
import styles from "./styles.module.scss";
import {UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import generateID from "../../../utils/generateID";

type PropsT = {
    name?: string,
    id?: string,
    classes?: string,
    style?: CSSProperties
    placeholder?: string,
    icon?: string,
    isPlaceholderFixed?: boolean,
    placeholderStyle?: CSSProperties
    placeholderClasses?: string
    toggleWrapperStyle?: CSSProperties
    wrapperClasses?: string
    menuStyle?: CSSProperties
    iconStyle?: CSSProperties,
    defaultValue?: string,
    delimiter?: true,
    imgWrapperStyle?: CSSProperties
    valueStyle?: CSSProperties
    label?: string
    options: Array<String>
    children?: React.ReactNode
    onChange: (value: string) => void
    value?: string
}

function DropdownCustom ({
                    children, name, placeholderStyle, isPlaceholderFixed,
                    id, placeholder, toggleWrapperStyle, menuStyle, iconStyle,
                    defaultValue, delimiter, imgWrapperStyle, valueStyle,
                    classes, style, icon, label, options = [], wrapperClasses, placeholderClasses,onChange,value}:PropsT)  {
    const [currentValue, setCurrentValue] = useState('');
    const [removePlaceholder, setRemovePlaceholder] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (defaultValue) {
            setCurrentValue(defaultValue)

            if (!isPlaceholderFixed) {
                setRemovePlaceholder(true)
            }
        }
    }, []);

    useEffect(() => {
        if (value) {
            setCurrentValue(value);
        }
    }, [value])



    return (
        <div className={wrapperClasses ? wrapperClasses : ''}>
        {label && <label className={'label'}>{label}</label>}
        <UncontrolledDropdown
                onToggle={(event,isOpen) => {
                        setIsOpen(isOpen);
                        if (!isOpen) {
                            const value = (event.target as HTMLTextAreaElement).value
                            if (value) {
                                setCurrentValue(value);
                                if (!isPlaceholderFixed) setRemovePlaceholder(true)
                                onChange(value);
                            }
                        }
                    }
                }
                className={`${styles.input} ${classes}`} style={style} id={id} name={name}>
            <DropdownToggle
                tag="div"
                className={styles.inputHeaderWrapper}
                style={toggleWrapperStyle}
                data-toggle="dropdown"
            >
                <div className={styles.inputHeader}>
                    {!removePlaceholder && <span style={placeholderStyle} className={placeholderClasses}>{placeholder}</span>}
                    {delimiter && <span>&#160;&#160;</span>}
                    <span style={valueStyle}>{currentValue}</span>
                </div>
                <div className={styles.inputPicWrapper} style={imgWrapperStyle}>
                    <img role="img" src={icon} className={styles.inputPic} style={iconStyle}/>
                </div>
            </DropdownToggle>
            <DropdownMenu
                tag={'div'}
                className={styles.inputMenu + ` ${isOpen ? styles.fadeIn : styles.fadeOut}`} style={menuStyle}>
                {options.map((option) => <DropdownItem value={option} key = {generateID()} className={styles.item}>{option}</DropdownItem>)}
                {children}
            </DropdownMenu>
        </UncontrolledDropdown>
        </div>
    );
}

export default DropdownCustom;