import { DocCardT, FileT } from ".";
import { ApplicationT } from "./applications";

export type GridSearchParams = {
    search?: string,
    sex?: "male" | "female",
    country?: string,
    city?: string,
    // service_type?: 'free' | 'vip' | 'pay' | 'wait',
    service_type?: string,
    responsibility?: string,
    page: number,
    limit: number,
    from_age?: string,
    to_age?: string,
    is_archive?: boolean,
    order_by?: 'asc' | 'desc'
}

export type GridPaginationT = {
    total: number,
    offset: number,
    limit: number,
    page_available: number
};

export type questionnairesT = {
    pagination: GridPaginationT,
    questionnaires: Array<GridSearchCardT>
}

export type MatchT = {
    questionnaire_id: number
    with_questionnaire_id: number
    name: string,
    city: string,
    photo: string | null
    in_mailing: boolean
    match: {
        total: number,
        appearance: number,
        personal_qualities: number,
        form: number,
        about_me: number,
        test: number
    }
}

export type StatsT = {
    online_count: number,
    questionnaires_all_count: number,
    applications_all_count: number,
    questionnaires_new_count: number,
    applications_new_count: number,
    last_applications: Array<ApplicationT>
}

export type GridSearchCardT = {
    id: number,
    name: string,
    ethnicity: string,
    service_type: string
    age: number,
    city: string,
    responsibility: string,
    created_at: string,
    photo: string | null,
    time: string,
    timestamp: number
    country?: string
}

export type GridSearchResponse = {
    success: true,
    message: string,
    data: questionnairesT
}

export type UploadFileT = {
    questionnaire_id: string | Blob,
    file: string | Blob,
    type: any
}

export type UploadPhotoT = {
    questionnaire_id: string | Blob,
    file: string | Blob,
}

export type DeletePhotoT = {
    questionnaire_id: number,
    photo_id: number
}

export type DownloadFileT = {
    questionnaire_id: number ,
    file_id: number,
    file_name: string
}

export type QResponse = {
    success: boolean,
    message: string,
    data: currentQ
}

export type currentQ =  {
    files: {
      files: Array<FileT>,
      photos: Array<any>
    },
    my_appearance: any,
    my_information: any,
    my_personal_qualities: any,
    partner_appearance: any,
    partner_information: any,
    personal_qualities_partner: Array<string>
    test: any
    application: any
    histories: Array<CommentT>,
    matched_count: number
}


export type DeleteFileT = {
    questionnaire_id: number ,
    file_id: number
}

export type getHistoryT = {
    questionnaire_id: any
}


export type addHistoryT = {
    questionnaire_id: number,
    comment: string
}

export type SetStatusT = {
    status: string,
    questionnaire_id: number,
}

export type GetMatchT = {
    questionnaire_id: number,
    limit?: number,
    page?: number
}



export type removeHistoryT = {
    questionnaire_id: number,
    history_id: number
}

export type GetMakeDateT = {
    questionnaire_id: number,
}

export type MakeDateT = {
    questionnaire_id: number,
    with_questionnaire_id: number,
    date: string,
    time: string
}

export type ViewMatchT = {
    questionnaire_id: number,
    with_questionnaire_id: number,
}

export type RemoveMatchT = {
    questionnaire_id: number,
    added_questionnaire_id: number,
}


export type AddMallingT = {
    questionnaire_id: number,
    add_questionnaire_id: number,
}

export type CreatePresentationT = {
    questionnaire_id: number,
}

export type PresentationT = {
    fetching: boolean,
    link: string | null
}

export type CommentT = {
    comment: string
    created_at: string
    from: string
    id: number
    name: string
}

export type CurrentMatchT = {
    matching_as: string,
    partner_questionnaire_id: 1,
    matching: {
        questionnaire_id: number,
        with_questionnaire_id: 4,
        name: string,
        total: string,
        appearance: string,
        information: string,
        about_me: string,
        test: string,
        personal_qualities: string
    },
    requirements: {
        my: {
            ethnicity?: boolean,
            body_type?: boolean,
            chest?: boolean,
            booty?: boolean,
            hair_color?: boolean,
            hair_length?: boolean,
            eye_color?: boolean
        },
        partner: {
            ethnicity?: boolean,
            body_type?: boolean,
            chest?: boolean,
            booty?: boolean,
            hair_color?: boolean,
            hair_length?: boolean,
            eye_color?: boolean
        }
    },
    names: {
        me: string,
        partner: string
    },
    qualities: {
        my: Array<string>,
        partner: Array<string>
    }
}

export type NotificationsT = {
    count: number,
    notifications: Array<NotificationT>
}

export type NotificationT = {
    id: number,
    type: string,
    message: string,
    payload: {
        questionnaire_id: number
    },
    created_at: string
    updated_at: string
}