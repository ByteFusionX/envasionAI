import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpenAI } from 'openai';
import { conversationBody } from '../shared/models/conversationBody.interface';
import { Observable, Subject } from 'rxjs';
import { Conversationmessages } from '../shared/models/messages.interface';


@Injectable({
    providedIn: 'root'
})
export class SubscriptionService {

    constructor(private http:HttpClient) { }
    
    private freeLimitSubscription = new Subject<number>();

    freeLimit$ = this.freeLimitSubscription.asObservable();

    updateFreeLimit(limit:number){
        this.freeLimitSubscription.next(limit)
    }

    getLimit(userId: string | null):Observable<number> {
        return this.http.get<number>(`http://localhost:3000/limit/${userId}`);
    }
}
