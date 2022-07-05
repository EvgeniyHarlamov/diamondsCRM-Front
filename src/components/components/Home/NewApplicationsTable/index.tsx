import React from "react"
import {Table} from 'reactstrap';
import { useAppSelector } from "../../../../app/hooks";
import { questionnairesSelector } from "../../../../features/questionnairesSlice";
import { NewApplicationsRow } from "../../../../types";
import { ApplicationT } from "../../../../types/applications";
import generateID from "../../../../utils/generateID";
import styles from './styles.module.scss';

type PropsT = {
    // data: Array<NewApplicationsRow>
}



function NewApplicationTable({}: PropsT) {
    const data = useAppSelector(questionnairesSelector).stats.last_applications;
    return(
        <Table hover responsive className={styles.table}>
        <thead>
            <tr>
                <th>ИМЯ</th>
                <th>EMAIl</th>
                <th>НОМЕР ТЕЛЕФОНА</th>
                <th>ИСТОЧНИК</th>
            </tr>
        </thead>
        <tbody>
            {data.map((row: ApplicationT) => {
                return(
                    <tr>
                        <td>{row.client_name}</td>
                        <td>{row.email}</td>
                        <td>{row.phone}</td>
                        <td>{row.from}</td>
                    </tr>
                )
            })}
        </tbody>
    </Table>
    )
}

export default NewApplicationTable;

