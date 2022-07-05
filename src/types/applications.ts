import React from "react"

export type ApplicationT = {
    id: number
    status: number,
    client_name: string,
    responsibility: {
        id: number,
        name: string,
        avatar: null | string,
        role: 1
    },
    service_type: string,
    email: string,
    phone: string,
    link: string | null,
    link_active: boolean | null,
    created_at: string
    updated_at?: string
    created_at_timestamp?: string
    from?: string
}

export type ApplicationsResponseT = {
    success: boolean,
    message: string,
    data: Array<ApplicationT> | []
    additional?: {
        isArchived: true
    }
}

export type ApplicationViewResponseT = {
    success: boolean,
    message: string,
    data: ApplicationT | null
}




export type ChangeStatusApplicationsResponseT = {
    success: boolean,
    message: string,
    data: string
}


export type GetApplicationsT = {
    search?: string,
    responsibility_id?: string
    archive_only?: true
}


export interface ChangeApplicationT {
    id: number,
    status: number,
}

export type StartWorkApplicationT = {
    id: number
}

export interface UpdateApplicationT {
    id: number
    client_name: string
    email: string
    status: number
    phone: string
}

export interface ViewApplicationT {
    id: number
}

export interface startToWork {
    id: number
}


export interface DeleteApplicationT {
    id: number
}

export interface UnarchiveApplicationT {
    id: number
}

export interface createApplicationT {
    client_name: string
    service_type: string
    email: string,
    phone: string
}

export interface ArchiveTableRecordT {
    created_at: string
    email: string
    inCharge: React.ReactNode
    inChargeRaw: string
    name: string
    order: number
    phone: string
    service: string
    status: number
}

