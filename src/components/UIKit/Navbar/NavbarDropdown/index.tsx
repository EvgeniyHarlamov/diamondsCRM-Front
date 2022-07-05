import styles from './styles.module.scss';
import {useHistory} from "react-router";
import { AnimatePresence, motion } from "framer-motion"

type PropsT = {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
}

function NavbarDropdown ({isOpen, setIsOpen}:PropsT)  {
  const history = useHistory();

  return(
    <AnimatePresence>
      {isOpen && <motion.div
        exit={{ height: 0, opacity: 0,}}
        id="navbarDropdown"
        className={styles.mobileDropdownContentWrapper}
        initial={{ opacity: 0, height: 0}}
        animate={{ opacity: 1, height: '100%'}}
        transition={{ duration: 0.4, type: "tween" }}
        >
            <div className={styles.item} onClick={() => {history.push('/home');}}>
                <span>Главная</span>
            </div>
            <div className={styles.item} onClick={() => {history.push('/questionnaires');}}>
                <span>Анкеты</span>
            </div>
            <div className={styles.item} onClick={() => {history.push('/applications');}}>
                <span>Заявки</span>
            </div>
            <div className={styles.item} onClick={() => {history.push('/employees');}}>
                <span>Сотрудники</span>
            </div>
            <div className={styles.item}
                onClick={() => {
                    localStorage.removeItem('token');
                    history.push('/auth');
                }}>
                <span>Выйти</span>
            </div>
        </motion.div>}
    </AnimatePresence>
  )
}

export default NavbarDropdown;