import { Formik } from "formik";
import React from "react";
import Loader from "react-loader-spinner";
import { clientDropdownMenuOptions } from "../../../../../constants";
import { MatchCardT } from "../../../../../types";
import { CurrentMatchT } from "../../../../../types/questionnaires";
import generateID from "../../../../../utils/generateID";
import Button from "../../../../UIKit/Button";
import Input from "../../../../UIKit/Input";
import Separator from "../../../../UIKit/Separator";
import Sidebar from "../../../../UIKit/Sidebar";
import UncontrolledDropdown from "../../../../UIKit/UncontrolledDropdown";
import CircleProgressBar from "../../ProfileMatch/MatchCard/CircleProgressBar";
import MatchInfoTitle from "./MatchInfoTitle";
import styles from './styles.module.scss';

type PropsT = {
    isOpen: boolean;
    setState: (e:boolean) => void
    matchInfo: CurrentMatchT | null
}


function MatchInfo({isOpen, setState, matchInfo}:PropsT) {

    if (matchInfo) {

        const info = [
            {
                field: 'Внешность',
                value: matchInfo.matching.appearance
            },
            {
                field: 'Качества',
                value: matchInfo.matching.personal_qualities
            },
            {
                field: 'Анкета',
                value: matchInfo.matching.information
            },
            {
                field: 'Тест',
                value: matchInfo.matching.test
            },
            {
                field: 'О себе',
                value: matchInfo.matching.about_me
            }
        ];

        let best = info.map((item:any) => {
            return(
                {
                    value: parseFloat(item.value),
                    field: item.field
                }
            )

        }).sort((a, b) => (a.value < b.value) ? 1 : -1)[0];

        let my_reqs = [
            {
                field: 'Телосложение',
                value: matchInfo.requirements.my.body_type
            },
            {
                field: 'Попа',
                value: matchInfo.requirements.my.booty
            },
            {
                field: 'Этно-принадлежность',
                value: matchInfo.requirements.my.ethnicity
            },
            {
                field: 'Грудь',
                value: matchInfo.requirements.my.chest
            },
            {
                field: 'Длина волос',
                value: matchInfo.requirements.my.hair_color
            },
            {
                field: 'Цвет волос',
                value: matchInfo.requirements.my.hair_color
            },
            {
                field: 'Цвет глаз',
                value: matchInfo.requirements.my.eye_color
            }
        ];

        let partner_reqs = [
            {
                field: 'Телосложение',
                value: matchInfo.requirements.partner.body_type
            },
            {
                field: 'Попа',
                value: matchInfo.requirements.partner.booty
            },
            {
                field: 'Этно-принадлежность',
                value: matchInfo.requirements.partner.ethnicity
            },
            {
                field: 'Грудь',
                value: matchInfo.requirements.partner.chest
            },
            {
                field: 'Длина волос',
                value: matchInfo.requirements.partner.hair_color
            },
            {
                field: 'Цвет волос',
                value: matchInfo.requirements.partner.hair_length
            },
            {
                field: 'Цвет глаз',
                value: matchInfo.requirements.partner.eye_color
            }
        ];


        let sorting_arr_values = CompareAppearance(my_reqs, partner_reqs);
        my_reqs = sorting_arr_values[0];
        partner_reqs = sorting_arr_values[1];

        let [my_qualities, partner_qualities] = CompareQualities(matchInfo.qualities.my, matchInfo.qualities.partner);
        return (
            <Sidebar
                isOpen = {isOpen}
                useScrollbar
                onClose = {() => setState(false)}
                bodyClass={styles.body}
                titleComponent={
                    <MatchInfoTitle
                        name={matchInfo.names.partner}
                        matchPercent={matchInfo.matching_as}
                        link={matchInfo.partner_questionnaire_id}
                        closeSidebar={() => setState(false)}
                    />
                }
            >
                <div className={styles.graphsBlock}>
                    <div className={styles.contentWrapper}>
                        <div className={styles.content}>
                                {info.map((item) => (
                                    <div className={styles.item} key={generateID()}>
                                        <CircleProgressBar item={item}/>
                                        <span>
                                            {item.field}
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className={styles.block}>
                        <div className={styles.tipsWrapper}>
                            <div className={styles.item}>
                                <div className={styles.imgWrapper}>
                                    <img src="/icons/redTip.png"/>
                                </div>
                                <span>0-49</span>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.imgWrapper}>
                                    <img src="/icons/orangeTip.png"/>
                                </div>                            <span>50-89</span>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.imgWrapper}>
                                    <img src="/icons/greenTip.png"/>
                                </div>
                                <span>90-100</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Separator/>

                <div className={styles.outcomeWrapper}>
                    <div className={styles.block}>
                        <div className={styles.outcomeGraphWrapper}>
                            <CircleProgressBar item={info[0]}/>
                                <span>
                                    {info[0].field}
                                </span>
                        </div>
                    </div>
                </div>
                <div className={styles.matchGrid}>
                    <div className={styles.column}>
                        <div className={styles.name}>{`Требования ${matchInfo.names.me}`}</div>
                        {my_reqs.map((item) => {
                            if (item.value && item.value !== undefined) {
                                return(
                                    <div className={styles.matchItem} key={generateID()}>
                                        <div className={styles.imgContainer}>
                                            <img src={'/icons/matchIcon.png'} />
                                        </div>
                                        <span>{item.field}</span>
                                    </div>
                                )
                            }
                            if (!item.value && item.value !== undefined) {
                                return(
                                    <div className={styles.noMatchItem} key={generateID()}>
                                        <div className={styles.imgContainer}>
                                            <img src={'/icons/noMatchIcon.png'} />
                                        </div>
                                        <span>{item.field}</span>
                                    </div>
                                )
                            }
                        })}
                    </div>

                    <div className={styles.column} key={generateID()}>
                        <div className={styles.name}>{`Требования ${matchInfo.names.partner}`}</div>
                        {partner_reqs.map((item) => {
                            if (item.value && item.value !== undefined) {
                                return(
                                    <div className={styles.matchItem} key={generateID()}>
                                        <div className={styles.imgContainer}>
                                            <img src={'/icons/matchIcon.png'} />
                                        </div>
                                        <span>{item.field}</span>
                                    </div>
                                )
                            }
                            if (!item.value && item.value !== undefined) {
                                return(
                                    <div className={styles.noMatchItem} key={generateID()}>
                                        <div className={styles.imgContainer}>
                                            <img src={'/icons/noMatchIcon.png'} />
                                        </div>
                                        <span>{item.field}</span>
                                    </div>

                                )
                            }
                        })}
                    </div>
                </div>

                {/* <Separator/> */}
                <div className={styles.outcomeWrapper}>
                    <div className={styles.block}>
                        <div className={styles.outcomeGraphWrapper}>
                            <CircleProgressBar item={info[1]}/>
                                <span>
                                    {info[1].field}
                                </span>
                        </div>
                    </div>
                </div>

                <div className={styles.matchGrid} style={{minHeight: `${(Math.max(my_qualities.length, partner_qualities.length)*35)+200}px`}}>
                    <div className={styles.column}>
                        <div className={styles.name}>{`Требования ${matchInfo.names.me}`}</div>
                        {my_qualities.map((item) => {
                            if (my_qualities.includes(item) && partner_qualities.includes(item)) {
                                return(
                                    <div className={styles.matchItem} key={generateID()}>
                                        <div className={styles.imgContainer}>
                                            <img src={'/icons/matchIcon.png'} />
                                        </div>
                                        <span>{item}</span>
                                    </div>
                                )
                            }
                            else {
                                return(
                                    <div className={styles.noMatchItem} key={generateID()}>
                                        <div className={styles.imgContainer}>
                                            <img src={'/icons/noMatchIcon.png'} />
                                        </div>
                                        <span>{item}</span>
                                    </div>
                                )
                            }
                        })}
                    </div>

                    <div className={styles.column} key={generateID()}>
                        <div className={styles.name}>{`Требования ${matchInfo.names.partner}`}</div>
                        {partner_qualities.map((item) => {
                            if (partner_qualities.includes(item) && my_qualities.includes(item)) {
                                return(
                                    <div className={styles.matchItem} key={generateID()}>
                                        <div className={styles.imgContainer}>
                                            <img src={'/icons/matchIcon.png'} />
                                        </div>
                                        <span>{item}</span>
                                    </div>
                                )
                            }
                            else {
                                return(
                                    <div className={styles.noMatchItem} key={generateID()}>
                                        <div className={styles.imgContainer}>
                                            <img src={'/icons/noMatchIcon.png'} />
                                        </div>
                                        <span>{item}</span>
                                    </div>

                                )
                            }
                        })}
                    </div>
                </div>
            </Sidebar>
        );
    }
    return(
        <div>
            {/* {isOpen &&  <div className={'loaderWrapperTop'}>
                <Loader
                    type="Oval"
                    color="#DCE5E6"
                    height={100}
                    width={100}
                    timeout={5000}
                />
            </div>} */}
        </div>

    );
}

export default MatchInfo;

type appearanceArrayItem = {
    field: string,
    value: boolean | undefined
}

function CompareAppearance(arr1: Array<appearanceArrayItem>, arr2: Array<appearanceArrayItem>) {
    let new_arr1 = [];
    let new_arr2 = [];
    let temp = [];

    for (let arr1_i of arr1) {
        let isMatch = false;
        for (let arr2_i of arr2) {
            if (arr2_i.field === arr1_i.field && arr1_i.value !== undefined && arr2_i.value !== undefined) {
                new_arr2.push(arr2_i);
                isMatch = true;
            }
        }
        if (isMatch) new_arr1.push(arr1_i);
        else temp.push(arr1_i);
    }

    if (new_arr1.length < arr1.length) new_arr1 = new_arr1.concat(temp);
    else new_arr2 = new_arr2.concat(temp);

    return [new_arr1, new_arr2];
}

function CompareQualities(arr1: Array<string>, arr2: Array<string>) {
    let new_arr1:Array<string>  = [];
    let new_arr2:Array<string> = [];
    let temp1:Array<string>  = [];
    let temp2:Array<string>  = [];

    for (let arr1_i of arr1) {
        let isMatch = false;
        for (let arr2_i of arr2) {
            if (arr2_i === arr1_i) {
                new_arr2.push(arr2_i);
                isMatch = true;
            }
        }
        if (isMatch) new_arr1.push(arr1_i);
        else temp1.push(arr1_i);
    }
    temp2 = arr2.filter((item:string) => !new_arr2.includes(item));
    new_arr1 = new_arr1.concat(temp1);
    new_arr2 = new_arr2.concat(temp2);

    return [new_arr1, new_arr2];
}