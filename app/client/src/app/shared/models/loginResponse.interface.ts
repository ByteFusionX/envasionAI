export interface loginResponse{
    token?:string,
    id?:string,
    incorrectPassword?:boolean,
    userExistError?:boolean
    loginWithGoogle?:boolean
}