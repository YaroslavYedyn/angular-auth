import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ILogin, IToken} from '../models';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

enum endpoint {
  login = 'auth/',
  refresh = 'auth/refresh',
  logout = 'auth/logout'
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL = 'http://localhost:5050/';
  private accessTokenKey = 'access-token';
  private refreshTokenKey = 'refresh-token';

  constructor(private http: HttpClient) {
  }

  login(object: ILogin): Observable<IToken> {
    return this.http.post<IToken>(`${this.URL}${endpoint.login}`, object)
      .pipe(
        tap((tokens: IToken) => this.setTokens(tokens))
      );
  }
  refreshToken(): Observable<IToken> {
    console.log('***refresh token***');
    return this.http.post<IToken>(`${this.URL}${endpoint.refresh}`, {token: this.getRefreshToken()})
      .pipe(
        tap((tokens: IToken) => this.setTokens(tokens))
      );
  }

  public isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  private setAccessToken(accessToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
  }

  private setRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  getAccessToken(): string {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.refreshTokenKey);
  }

  removeTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  private setTokens(tokens: IToken): void {
    const {access_token, refresh_token} = tokens;
    this.setAccessToken(access_token);
    this.setRefreshToken(refresh_token);

  }
}

