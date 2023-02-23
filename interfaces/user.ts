import { Auth } from "./auth";

export interface User extends Auth {
    id: string,
    name: string,
    username: string,
    repeat_password: string,
    deleted: boolean,
    id_rol: number
}

// export interface RegisterUserData extends Auth {
//     name: string,
//     username: string,
//     repeat_password: string
// }

// export interface RegisterUserData extends Pick<Auth, "name" | "username" | "repeat_password" > {}
export interface RegisterUserData extends Omit<User, "id" | "deleted" | "id_rol" > {}

export type LoginResponse = 
    "USER_NOT_FOUND" |
    "USER_PASSWORD_INVALID" |
    "USER_DELETED" 

export type RegisterResponse = 
    "USER_ALREDY_REGISTERED" |
    "USER_PASSWORDS_NOT_MATCH" |
    "USER_CREATED" 

export interface LoginData {
    token: string,
    logged_user: User
}