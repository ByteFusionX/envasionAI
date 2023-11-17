import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { patterns } from 'src/app/shared/patterns/regexPatterns';
import { signUpForm } from 'src/app/shared/models/signUpForm.interface';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpDetails!: signUpForm
  submit: boolean = false
  confirmPasswordError: boolean = false

  constructor(public fb: FormBuilder, public authService: AuthService,public router:Router) { }

  ngOnInit(): void {

  }

  registerForm = this.fb.group({
    name: patterns.name,
    email: patterns.email,
    password: patterns.password,
    confirmPassword: patterns.password
  })

  onSubmit() {
    this.submit = true
    const password = this.registerForm.value.password
    const confirmPassword = this.registerForm.value.confirmPassword
    if (password === confirmPassword && this.registerForm.valid) {
      const formValue = this.registerForm.value as signUpForm;
      this.authService.signUp(formValue).subscribe((res) => {
        this.router.navigate(['/login'])
      })
    } else {
      this.confirmPasswordError = true
    }

  }

}
