import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { patterns } from 'src/app/shared/patterns/regexPatterns';
import { signUpForm } from 'src/app/shared/models/signUpForm.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpDetails!: signUpForm
  submit: boolean = false
  confirmPasswordError: boolean = false
  touchPass: boolean = true
  alreadySignUp: boolean = false

  constructor(public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public afAuth: AngularFireAuth,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
   
  }

  get form() {
    return this.registerForm.controls
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.authService.signUpWithGoogle(result.additionalUserInfo?.profile).subscribe((data) => {
          console.log(data)
          if (data.alreadyRegistered) {
            console.log(data)
            this.dialog.open(AlertDialogComponent, {
              width: '490px',
              panelClass: 'custom-container' 
            })
          } else{
            if (data.token) {
              localStorage.setItem('userId', data.id as string)
              localStorage.setItem('userToken', data.token as string)
              this.router.navigate(['/'])
            }
          }
          
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onPasswordTouched() {
    this.touchPass = false
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
        if (res.loginWithGoogle) {
         this.dialog.open(AlertDialogComponent, {
            width: '490px',
            panelClass: 'custom-container' 
          })
        } else if (res.alreadySignUp) {

          this.alreadySignUp = true
          setTimeout(() => {
            this.alreadySignUp = true
          }, 4000);

        } else {
          localStorage.setItem('userId', res.id as string)
          localStorage.setItem('userToken', res.token as string)
          this.router.navigate(['/'])
        }

      })
    } else {
      this.confirmPasswordError = true
    }

  }

}
