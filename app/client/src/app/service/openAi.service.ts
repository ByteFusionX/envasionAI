import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversationmessages } from '../shared/models/messages.interface';


@Injectable({
    providedIn: 'root'
})
export class OpenAiService {

    constructor(private http:HttpClient) { }
     sendMessage(body: Conversationmessages[]):Observable<Conversationmessages> {
        const userId = localStorage.getItem('userId')
        return this.http.post<Conversationmessages>(`http://localhost:3000/conversation/${userId}`,body);
    }

}
