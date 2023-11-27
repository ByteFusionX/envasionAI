import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signUpForm, signupResponse } from '../shared/models/signUpForm.interface';
import { loginForm } from '../shared/models/loginForm.interface';
import { loginResponse } from '../shared/models/loginResponse.interface';
import { Observable } from 'rxjs';
import { loginWithGoogle } from '../shared/models/loginWithGoogle';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { userDetails } from '../shared/models/userDetails.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(details: signUpForm): Observable<signupResponse> {
    console.log(details)
    return this.http.post<signupResponse>('http://localhost:3000/signup', details)
  }

  login(details: loginForm ): Observable<loginResponse> {
    return this.http.post<loginResponse>('http://localhost:3000/login', details)
  }

  loginWithGoogle(details:loginWithGoogle|undefined|null):Observable<loginResponse>{
    return this.http.post<loginResponse>('http://localhost:3000/loginWithGoogle',details)
  }

  getUserDetails():Observable<userDetails>{
    const userId = localStorage.getItem('userId')
    return this.http.get<userDetails>(`http://localhost:3000/profile/${userId}`)
  }
}
