import React, {useEffect, useState} from 'react';
import Separator from '../Separator';
import Popup from '../Popup';
import { AnimatePresence, motion } from "framer-motion"
import styles from './styles.module.scss';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import Scrollbar from '../../UIKit/Scrollbar';
import { Toaster } from 'react-hot-toast';

type PropsT = {
    title?: string
    subtitle?: string
    isOpen: boolean,
    onClose: () => void
    children?: React.ReactNode
    bodyClass?: string
    useScrollbar?: boolean
    titleComponent?: React.ReactNode
    isLarge?: true
}

function Sidebar ({children, title, subtitle, isOpen, onClose, bodyClass, useScrollbar,
    titleComponent, isLarge}:PropsT) {
    const [id, setId] = useState('_' + Math.random().toString(36).substr(2, 9));
    const { height, width } = useWindowDimensions();
    const [ bodyHeight, setBodyHeight ]= useState('100%');
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            return(
                (): void => {
                    document.body.style.overflow = "visible";
                }
            )
        }
    }, [isOpen, bodyHeight]);

    const variants = {
        open: { opacity: 1, x: 0},
        closed: { opacity: 0, x: 600},
    }

    const bodyWithScrollbar:React.ReactNode =
    <Scrollbar className={styles.sidebarScrollbar}>
        <div className={`${styles.body} ${bodyClass ? bodyClass : ''}`}>
            {children}
        </div>
    </Scrollbar>;

    const body:React.ReactNode =
    <div className={`${styles.body} ${bodyClass ? bodyClass : ''}`}>
        {children}
    </div>;

    const defaultTitle:React.ReactNode =
    <>
    <div className={styles.titleBlockWrapper}>
        <div className={styles.titleContainer}>
            <span className={styles.title}>{title}</span>
            <span onClick = {onClose}>
                <img className = {styles.closeBtn} role="img" src="/icons/close.svg"/>
            </span>
        </div>

    </div>
    {subtitle &&
    <div className={styles.subtitleBlockWrapper}>
        <span>{subtitle}</span>
    </div>}
    </>;

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Popup isOpen={isOpen} onClick={onClose}>
                <AnimatePresence>
                    {isOpen && <motion.div
                        exit={{ opacity: 0, x: 600}}
                        className={isLarge ? styles.sidebarLarge : styles.sidebar}
                        id={'sidebar'}
                        initial={{ opacity: 0, x: 600}}
                        animate={isOpen ? "open" : "closed"}
                        transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                        variants={variants}
                    >
                        <div className={styles.blockWrapper} id = {'sidebar-block-wrapper' + id}>
                            {!titleComponent ? defaultTitle : titleComponent}
                        </div>
                        <Separator/>
                        {useScrollbar ? bodyWithScrollbar : body}
                    </motion.div>}
                </AnimatePresence>
            </Popup>
        </>
    );
}

export default Sidebar;