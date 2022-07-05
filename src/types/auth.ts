export interface AuthState {
    username: string
    email: string
    isFetching: boolean
    isSuccess: boolean
    isError: boolean
    errorMessage: string
    isAuth: boolean
}

export interface AuthErrorT {
  success: boolean,
  message: string,
  data: null
}

export type AuthUserDataT = {
    email: string
    password: string
}

export type LoginResponseT = {
    success: boolean,
    message: string,
    data: {
        token: string,
        name: string
    } | null
}

