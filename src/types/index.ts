import { string } from "prop-types"

export type QuestionnairesCard = {
    nation: string,
    age: string,
    country: string,
    city: string,
    inCharge: string,
    time: string,
    service: 'Оплачено' | 'VIP' | 'На оплате' | 'Бесплатно'
    name: string,
    avatar: string
}

export type NewApplicationsRow = {
    name: string,
    email: string,
    phone: string,
    source: string
}

export type ClientRecordT = {
    id: string
    order: string
    creator: string
    created_at: string
    name: string
    inCharge: string
    inChargeRaw: string
    status: string
    service: string
    email: string
    phone: string
    type?: string
    isFirstContact?: boolean
}


export type MainInfoT = {
    name: string,
    avatar: string,
    city: string
}

export type ClientT = {
    clientInfo: {
        photos?: Array<PhotoCardT>
        fields: Array<SectionT>
        docs?: Array<DocCardT>
        comments?: Array<CommentCardT>
    }
    parthnerInfo: {
        fields: Array<SectionT>
    }
}

export type SectionT = {
    section: string,
    info: Array<InfoCardRowT>
}

export type InfoCardRowT = {
    field?: string,
    value: string | null | boolean
}

export type PhotoCardT = {
    path: string
    id: number
}

export type DocCardT = {
    header: string,
    file: FileT
}

export type FileT = {
    id: number,
    type: string,
    name: string,
    size: string
}

export type CommentCardT = {
    name: string,
    date: string,
    desc: any,
    link?: string
}

export type MatchCardT = {
    info: MainInfoT,
    graphs: Array<InfoCardRowT>
}


export type CircleProgressBarT = {
    rotation?: number;
    strokeLinecap?: any;
    textColor?: string;
    textSize?: string | number;
    pathColor?: string;
    pathTransition?: string;
    pathTransitionDuration?: number;
    trailColor?: string;
    backgroundColor?: string;
}

export type DropdownItem = {
    value: string,
    label: string
}