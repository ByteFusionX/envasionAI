import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signUpForm } from '../shared/models/signUpForm.interface';
import { loginForm } from '../shared/models/loginForm.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  signUp(details:signUpForm){
    console.log(details)
    return this.http.post('http://localhost:3000/signup',details)
  }

  login(details:loginForm){
    return this.http.post('http://localhost:3000/login',details)
  }
}
