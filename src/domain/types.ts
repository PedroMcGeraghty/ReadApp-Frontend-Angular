import { HttpResponse } from "@angular/common/http"

export type LoginRequest = {
    username: string
    password: string
}

export type NewAccountRequest = {
    username: string
    password: string
    name: string
    email: string
}

export type PasswordRecoveryRequest = {
    email: string,
    username: string,
    newPassword:string
}

