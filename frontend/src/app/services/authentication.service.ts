import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Marsupilami } from '../common/marsupilami';

export interface MarsuDetails {
  _id: string;
  exp: number;
  iat: number;
  login: string;
  password: string;
  age?: number;
  famille?: string;
  race?: string;
  nourriture?: string;
  dateCreation?: Date;
  marsupilami?: Marsupilami;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  login: string;
  password: string;
  age: number;
  famille: string;
  race: string;
  nourriture: string;
  dateCreation?: Date;
}


@Injectable()
export class AuthenticationService {
  private token: string;

  authUri: string = 'http://localhost:4000/auth';

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

  public getMarsuDetails(): MarsuDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const marsu = this.getMarsuDetails();
    if (marsu) {
      // marsu.exp = NumericDate from 1970-01-01 to now
      return marsu.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post' | 'get', type: 'signup' | 'login' | 'me', marsu?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`${this.authUri}/${type}`, marsu);
    } else {
      base = this.http.get(`${this.authUri}/${type}`, { headers: { 'token': `${this.getToken()}` } });
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(marsu: TokenPayload): Observable<any> {
    return this.request('post', 'signup', marsu);
  }

  public login(marsu: TokenPayload): Observable<any> {
    return this.request('post', 'login', marsu);
  }

  public profile(): Observable<any> {
    return this.request('get', 'me');
  }

}
