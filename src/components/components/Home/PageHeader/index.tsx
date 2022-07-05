import React, {useEffect, useState} from "react";
import Container from "../../../UIKit/Container";
import Navbar from "../../../UIKit/Navbar";
import styles from "./styles.module.scss";

type Props = {
    name: string,
    amountOfManagersOnline: number,
}

const helloTemplate = (name: string) => `Добрый день, ${name.split(' ')[0]}!`;
const managersOnlineTemplate = (amountOfManagersOnline: number) => `Сейчас на сайте ${amountOfManagersOnline} сотрудника`;

const Comp = ({name, amountOfManagersOnline}: Props) => {
    let [timestamp, setTimestamp] = useState(Date.now());

    let date = new Date(timestamp);

    const getDate = (date: Date) => date.toLocaleString("ru", {
        month: "long",
        day: "numeric",
        weekday: "long"
    });
    const getTime = (date: Date) => date.toLocaleString("ru", {
        hour: "numeric",
        minute: "numeric"
    });

    useEffect(() => {
        let timer = setInterval(() => setTimestamp(Date.now()), 60 * 1000);

        return () => {
            clearTimeout(timer);
        };
    })

    return (
        <div className={styles.header}>
            <Container>
                <div className={styles.topbar}>
                    <div className={styles.date}>
                        <span>
                            {`${getDate(date).split(',')[1]}, ${getDate(date).split(',')[0].toLowerCase()}`}
                        </span>
                        <span className={styles.dot}>
                            •
                        </span>
                        <span>
                            {getTime(date)}
                        </span>
                    </div>
                    <span className={styles.employeeCount}>
                        {managersOnlineTemplate(amountOfManagersOnline)}
                    </span>
                </div>
                <h1 className={styles.hello}>
                    {helloTemplate(name)}
                </h1>
            </Container>
        </div>
    );
}

export default Comp;