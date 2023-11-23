import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { loginForm } from 'src/app/shared/models/loginForm.interface';
import { loginResponse } from 'src/app/shared/models/loginResponse.interface';
import { patterns } from 'src/app/shared/patterns/regexPatterns';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  submit: boolean = false
  incorrectPasswordError: boolean = false
  userExistError: boolean = false
  touchPass: boolean = true

  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router) { }

  loginForm = this.fb.group({
    email: patterns.email,
    password: patterns.password
  })

  ngOnInit(): void {
  }



  get form() {
    return this.loginForm.controls
  }

  onPasswordTouched() {
    this.touchPass = false
  }



  onSubmit() {
    this.submit = true
    if (this.loginForm.valid) {
      const details = this.loginForm.value as loginForm
      this.authService.login(details).subscribe((res: loginResponse) => {
        if (res.token) {
          console.log(res)
          localStorage.setItem('userId', res.id as string)
          localStorage.setItem('userToken', res.token as string)
          this.router.navigate(['/'])
        } else if (res.incorrectPassword) {
          this.incorrectPasswordError = true
        } else if (res.userExistError) {
          this.userExistError = true
        }

      })
    }
  }
}
