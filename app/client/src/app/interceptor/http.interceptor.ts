import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class UserHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('userToken')
        if (token) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', token)
            });
            return next.handle(authReq)
        }
        return next.handle(req).pipe(catchError((error) => {
            if (error.status === 401) {
                alert('Unautherized Error Occures')
            }
            throw error
        }))
    }
}