import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conversationmessages } from '../shared/models/messages.interface';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class replicateService {
    constructor(private http :HttpClient) { }
    vedioGenarator(body: Conversationmessages[]): Observable<Conversationmessages> {
        const userId = localStorage.getItem('userId')
        return this.http.post<Conversationmessages>(`http://localhost:3000/vedioGenarater/${userId}`, body);
    }
}