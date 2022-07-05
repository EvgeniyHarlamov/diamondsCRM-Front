import React, {useRef, useState, CSSProperties} from 'react';
import styles from "./styles.module.scss";
import {useHistory, useLocation} from "react-router";
import Separator from '../Separator';
import Container from '../Container';
import NavbarDropdown from './NavbarDropdown';
import useOutsideAlerter from '../../../hooks/useOutsideAlerter';
import Avatar from '../../UIKit/Avatar';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { authSelector } from '../../../features/authSlice';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PushMenu from './PushMenu';
import { getNotifications } from '../../../features/notificationsSlice';

export default function Navbar ()  {
    const history = useHistory();
    const location = useLocation();
    const wrapperRef = useRef(null);


    const [navbarDropdownOpen, setNavbarDropdownOpen] = useState(false);
    useOutsideAlerter(wrapperRef,  navbarDropdownOpen, setNavbarDropdownOpen);
    const username = useAppSelector(authSelector).username;

    const contentStyle:CSSProperties = {
        width: '320px',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 0px 3px',
    }

    return (
        <>
        <div className={styles.navbarBackground}>
            <Container mobileFull>
                <nav className={styles.navbar}>
                    <div className={styles.mainBrand}>
                        <img src="/icons/logo.png" onClick={() => {
                            history.push('/home');
                        }}/>
                    </div>
                    <div
                        className={styles.routeItem + ` ${location.pathname === '/home' || location.pathname === '/' ? styles.activeRouteItem : ''}`}
                    >
                        <span onClick={() => {
                            history.push('/home');
                        }}>Главная</span>
                    </div>
                    <div
                        className={styles.routeItem + ` ${location.pathname.includes('/questionnaires') ? styles.activeRouteItem : ''}`}
                    >
                        <span onClick={() => {
                            history.push('/questionnaires');
                        }}>Анкеты</span></div>
                    <div
                        className={styles.routeItem + ` ${location.pathname === '/applications' ? styles.activeRouteItem : ''}`}
                    >
                        <span onClick={() => {
                            history.push('/applications');
                        }}>Заявки</span></div>
                    <div
                        className={styles.routeItem + ` ${location.pathname === '/employees' ? styles.activeRouteItem : ''}`}
                    >
                        <span onClick={() => {
                            history.push('/employees');
                        }}>Сотрудники</span></div>
                    <div className={styles.statusBarWrapper}>
                        <Popup
                            trigger={PushMenuIcon}
                            position="bottom right"
                            repositionOnResize
                            contentStyle={contentStyle}
                        >
                            <PushMenu/>
                        </Popup>
                        <div className={styles.statusBarItem}>
                            <Avatar
                                value={username}
                                showSignature
                                fontSize={'16px'}
                                height={'32px'}
                                logoFontSize={'16px'}
                                fullName
                            />
                        </div>
                        <Popup
                            trigger={popupMenuIcon}
                            position="bottom right"
                            repositionOnResize
                            >
                            <div
                                className={styles.exitButton}
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    history.push('/auth');
                                }}>
                                Выход
                            </div>
                        </Popup>
                    </div>
                </nav>
                <nav className={styles.navbarMobile}>
                    <div className={styles.mainBrand}>
                        <img src="/icons/logo.svg" onClick={() => {
                            history.push('/home');
                        }}/>
                    </div>
                    <div
                        className={styles.dropdownContainer}
                        onClick={() => {
                            setNavbarDropdownOpen(!navbarDropdownOpen);
                        }}
                        ref={wrapperRef}
                    >
                        <img src="/icons/navbar.svg"/>
                    </div>
                </nav>
                <NavbarDropdown
                    isOpen={navbarDropdownOpen}
                    setIsOpen={setNavbarDropdownOpen}
                />
            </Container>

        </div>
        {/*<Separator/>*/}
        </>
    );
}

function popupMenuIcon() {
    return(
        <div className={styles.arrow}>
            <img src="/icons/arrow.svg"/>
        </div>
    )
}

function PushMenuIcon() {

    return(
        <div
            className={styles.bell}
        >
            <img src="/icons/bell.svg"/>
        </div>
    )
}