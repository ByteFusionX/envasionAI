export interface signUpForm {
    name:string|null,
    email:string|null,
    password:string|null,
    confirmPassword:string|null
}

export interface signupResponse {
    loginWithGoogle:boolean,
    alreadySignUp:boolean,
    status:boolean,
    id?:string,
    token?:string
}

