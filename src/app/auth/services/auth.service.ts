import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../../models/loginRequest';
import { environment } from '../../../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  Login(request: LoginRequest) {
    return this.http.post(`${environment.authAPI}/auth/login`, request);
  }

  UsersList(pageNumber: number, token: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${environment.authAPI}/user?pageNumber=${pageNumber}&pageSize=${10}`, { headers });
  }

  CreateUser(request: any) {
    return this.http.post(environment.authAPI + "/user", request)
  }

  DeleteUser(id: any, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(environment.authAPI + `/user/${id}`, { headers })
  }

  UpdateUser(id: number, request: any, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(environment.authAPI + `/user/${id}`, request, { headers });
  }

  ResetPassword(id: number, request: any, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(environment.authAPI + `/user/${id}/password`, request, { headers });
  }

}