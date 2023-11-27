export interface loginResponse{
    alreadyRegistered: any
    token?:string,
    id?:string,
    incorrectPassword?:boolean,
    userExistError?:boolean
    loginWithGoogle?:boolean
}