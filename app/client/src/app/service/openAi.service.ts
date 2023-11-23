import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpenAI } from 'openai';
import { conversationBody } from '../shared/models/conversationBody.interface';
import { Observable } from 'rxjs';
import { Conversationmessages } from '../shared/models/messages.interface';


@Injectable({
    providedIn: 'root'
})
export class OpenAiService {

    constructor(private http:HttpClient) { }
     sendMessage(body: conversationBody):Observable<Conversationmessages> {
        return this.http.post<Conversationmessages>('http://localhost:3000/conversation',body);
    }

}
