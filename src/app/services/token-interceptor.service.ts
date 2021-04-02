import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isAuthenticated = this.authService.isAuthenticated();

    if (isAuthenticated) {
      req = this.addToken(req, this.authService.getAccessToken());
    }
    return next.handle(req).pipe((catchError((res: HttpErrorResponse) => {
      if (res && res.error) {
        if (res instanceof HttpErrorResponse && res.status === 401) {
          console.log('***401***');
          return this.handle401Error(req, next);
        }
        if (res.error.customCode === 4000) {
          console.log(res.error);
          alert(res.error.message.details[0].message);
        }
      }
      if (res.status === 403) {
        if (res.error.customCode === 4003) {
          console.log('***4003***');
          alert(res.error.message);
          return res.error;
        }
        console.log('***403***');
        this.router.navigate(['error'], {
          queryParams: {
            sessionFiled: true
          }
        });
      }
    }))) as any;

  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({setHeaders: {Authorization: `${token}`}});
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): any {
    console.log('log');
    return this.authService.refreshToken().pipe(
      switchMap((tokens) => {
        return next.handle(this.addToken(req, tokens.access_token));
      })
    );
  }
}
