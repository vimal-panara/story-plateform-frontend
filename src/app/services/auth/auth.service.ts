import { Injectable, Optional, inject } from '@angular/core';
import { env } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiDomain!: string
  http = inject(HttpClient)
  headers!: HttpHeaders

  constructor(
  ) { 
    this.apiDomain = env.apiDomain;
    this.headers = new HttpHeaders({
      "Authorization": env.idxToken,
      "Origin": "https://localhost:4200"
    })
  }

  login(credential: { email: string, password: string }): Observable<any> {
    return this.http.post(
      `https://${this.apiDomain}/login`, 
      credential,
      { headers: this.headers }
    )
  }

  register(data: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(
      `https://${this.apiDomain}/register`, 
      data,
      { headers: this.headers } 
    );
  }

}
