import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { Router } from '@angular/router';
import swal from 'sweetalert';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router:Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
           
            if (err.status === 400) {
               swal("Error",err.error.err.message,"error");
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}