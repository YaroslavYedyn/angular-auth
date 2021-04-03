import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IRegister} from '../models';
import {IUser} from '../models/IUser';

enum endpoint {
  activate = 'email/activate',
  change_password = 'users/forgotPassword',
  forgot = 'email/forgot',
  users = 'users/',
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL = 'http://localhost:5050/';

  constructor(private http: HttpClient) {
  }

  setUserId(id: string): void {
    localStorage.setItem('user_id', id);
  }

  getUserId(): string {
    return localStorage.getItem('user_id');
  }

  activateAccount(token: string): Observable<void> {
    return this.http.post<void>(`${this.URL}${endpoint.activate}`, {token});
  }

  createAccount(object: IRegister): Observable<void> {
    const formData = new FormData();
    formData.append('username', object.username);
    formData.append('email', object.email);
    formData.append('password', object.password);
    // tslint:disable-next-line:no-unused-expression
    (object.avatar) && formData.append('avatar', object.avatar);
    return this.http.post<void>(`${this.URL}${endpoint.users}`, formData);
  }

  getSingleUser(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.URL}${endpoint.users}${id}`);
  }

  updateUser(id: string, data): Observable<IUser> {
    return this.http.put<IUser>(`${this.URL}${endpoint.users}${id}`, data);
  }

  forgotPasswordSendEmail(email): Observable<any> {
    return this.http.post<any>(`${this.URL}${endpoint.forgot}`, email);
  }

  changePassword(password, token): Observable<void> {
    console.log(token);
    console.log(password);
    return this.http.post<void>(`${this.URL}${endpoint.change_password}`, {...password, forgot_token: token});
  }

  removeAccount(id: string): Observable<void> {
    console.log(id);
    return this.http.delete<void>(`${this.URL}${endpoint.users}${id}`);
  }
}
