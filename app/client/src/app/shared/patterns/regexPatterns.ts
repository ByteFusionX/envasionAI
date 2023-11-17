import { Validators } from "@angular/forms";

export const patterns={
    name:['',Validators.required],
    email:['',[Validators.email,Validators.required]],
    password:['',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$")]],
    mobileNumber:['',[Validators.required,Validators.pattern('^[0-9]{10}$')]]
}