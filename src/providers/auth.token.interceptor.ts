
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { RedditService } from './reddit-service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  
  constructor(
    public auth: AuthenticationService, 
    public redditService:RedditService, 
    public storage: Storage,
    private router: Router  ) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = "my-token-string-from-server";

    //Authentication by setting header with token value
   

       request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      })
    
  

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json'
        }
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
       //   console.log('event--->>>********', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);

      if (error.status === 401) {


           this.redditService.refreshToken().subscribe(data=>{
            this.storage.set("token",data.token);
            this.storage.set("refreshToken",data.refreshToken);
            this.storage.set("expirationDate",data.expirationDate);
         
            })
       
     }


      if (error.status === 400) {


        this.redditService.refreshToken().subscribe(data=>{
          this.storage.set("token",data.token);
          this.storage.set("refreshToken",data.refreshToken);
          this.storage.set("expirationDate",data.expirationDate);
       
          })

       // this.router.navigateByUrl('/login');

        this.router.navigateByUrl('/login');

    
   }
        return throwError(error);
      }));
  }


}





