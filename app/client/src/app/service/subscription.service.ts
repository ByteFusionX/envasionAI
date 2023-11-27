import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


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

    getPaymentUrl(userId:string | null):Observable<string>{
        return this.http.get<string>(`http://localhost:3000/stripe/${userId}`)
    }

    checkSubscriptiohn():Observable<boolean>{
        const userId = localStorage.getItem('userId')
        return this.http.get<boolean>(`http://localhost:3000/checkSubscription/${userId}`)
    }
}
