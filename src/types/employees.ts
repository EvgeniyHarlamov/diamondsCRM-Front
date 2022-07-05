import React from "react";

export interface TableEmployeeT {
    order: string,
    name: string,
    email: string,
    phone: string,
    role: string,
    roleRaw: React.ReactNode,
    date: string,
    creator: string
}

export type EmployeeT = {
    id: string,
    name: string,
    email: string,
    email_verified_at: string | null,
    phone: string
    role: number
    deleted_at: string | null
    created_at: string
    created_at_timestamp: string
    updated_at: string | null
}

export interface EmployeesResponseT {
    success: boolean,
    message: string,
    data: {
        count: number,
        data: Array<EmployeeT> | []
    },
}

export interface UpdateEmployeePasswordT {
    user_id: number
    name: string,
}

export interface ArchiveEmployeeT {
    user_id: number
}

export interface UpdateEmployeeDataT {
    user_id: number
    name: string
    phone: string,
    role: number,
    email: string
}

export interface CreateEmployeeT {
    email: string
    name: string
    role: number
    phone: string
}