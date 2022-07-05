import React, {CSSProperties, useEffect, useState} from "react";
import styles from "./styles.module.scss";
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import generateID from "../../../utils/generateID";

type PropsT = {
    name?: string,
    id?: string,
    classes?: string,
    style?: CSSProperties
    placeholder?: string,
    value?: string,
    isOpen?: boolean,
    toggle: any,
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
}

function DropdownCustom ({
                    children, name, placeholderStyle, isPlaceholderFixed,
                    id, placeholder, toggleWrapperStyle, menuStyle, iconStyle,
                    defaultValue, delimiter, imgWrapperStyle, valueStyle,
                    value, classes, style, icon, isOpen, toggle, label, options = [], wrapperClasses, placeholderClasses}:PropsT)  {
    const [currentValue, setCurrentValue] = useState('');
    const [removePlaceholder, setRemovePlaceholder] = useState(false);

    useEffect(() => {
        if (defaultValue) {
            setCurrentValue(defaultValue)
        }
    }, []);
    useEffect(() => {
        if (value) {
            setCurrentValue(value)
            if (!isPlaceholderFixed) setRemovePlaceholder(true);
        }
    }, [value]);


    return (
        <div className={wrapperClasses ? wrapperClasses : ''}>
        {label && <div className={'label'}>{label}</div>}
        <Dropdown isOpen={isOpen} toggle={toggle}
                  className={`${styles.input} ${classes}`} style={style} id={id} name={name}>
            <DropdownToggle
                tag="div"
                className={styles.inputHeaderWrapper}
                style={toggleWrapperStyle}
                data-toggle="dropdown"
                aria-expanded={isOpen}
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
            <DropdownMenu className={styles.inputMenu + ` ${isOpen ? styles.fadeIn : styles.fadeOut}`} style={menuStyle}>
                {options.map((option) => <DropdownItem value={option} key = {generateID()} className={styles.item}>{option}</DropdownItem>)}
                {children}
            </DropdownMenu>
        </Dropdown>
        </div>
    );
}

export default DropdownCustom;