import { Component,OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
    constructor(public fb:FormBuilder){}

    ngOnInit(): void {
      
    }

    registerForm =  this.fb.group({
      name:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      confirmPassword:['',Validators.required]
    })

    onSubmit(){
      console.log(this.registerForm.value)
    }
    
}
