import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { loginForm } from 'src/app/shared/models/loginForm.interface';
import { loginResponse } from 'src/app/shared/models/loginResponse.interface';
import { patterns } from 'src/app/shared/patterns/regexPatterns';
import { GoogleAuthProvider } from 'firebase/auth';

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

  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router, public afAuth: AngularFireAuth) { }

  loginForm = this.fb.group({
    email: patterns.email,
    password: patterns.password
  })

  ngOnInit(): void {
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any){
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.authService.loginWithGoogle(result.additionalUserInfo?.profile).subscribe((data) => {
          if (data.token) {
            localStorage.setItem('userId', data.id as string)
            localStorage.setItem('userToken', data.token as string)
            this.router.navigate(['/'])
          }
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }




  get form() {
    return this.loginForm.controls
  }


  onSubmit() {
    this.submit = true
    if (this.loginForm.valid) {
      const details = this.loginForm.value as loginForm
      this.authService.login(details).subscribe((res: loginResponse) => {
        if (res.token) {
          localStorage.setItem('userId', res.id as string)
          localStorage.setItem('userToken', res.token as string)
          this.router.navigate(['/'])
        } else if (res.incorrectPassword) {
          this.incorrectPasswordError = true
        } else if (res.userExistError) {
          this.userExistError = true
        } else if (res.loginWithGoogle){
           alert('Already there')
        }

      })
    }
  }
}
