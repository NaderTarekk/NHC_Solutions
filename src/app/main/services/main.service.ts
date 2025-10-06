import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  getIpAddress(): Observable<any> {
    return this.http.get('https://api.ipify.org?format=json');
  }

  PostNewVisitor(request: any) {
    return this.http.post(environment.mainAPI + "/visitor", request);
  }

  GetAllVisitors(pageNumber: number, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const params = {
      pageNumber: pageNumber.toString(),
      pageSize: '10'
    };

    return this.http.get(environment.mainAPI + '/visitor', {
      headers: headers,
      params: params
    });
  }

  // Services
  ServicesList(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(`${environment.mainAPI}/service?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  CreateService(request: any, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${environment.mainAPI}/service`, request, { headers });
  }

  UpdateService(id: number, request: any, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${environment.mainAPI}/service/${id}`, request, { headers });
  }

  DeleteService(id: number, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${environment.mainAPI}/service/${id}`, { headers });
  }

  // Technologies
  TechList(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(`${environment.mainAPI}/technology?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  CreateTech(request: any, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${environment.mainAPI}/technology`, request, { headers });
  }

  UpdateTech(id: number, request: any, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${environment.mainAPI}/technology/${id}`, request, { headers });
  }

  DeleteTech(id: number, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${environment.mainAPI}/technology/${id}`, { headers });
  }

  // Testimonial
  TestimonialList(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(`${environment.mainAPI}/testimonial?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  GetApprovedTestimonials(pageNumber: number, pageSize: number, isApprove: boolean): Observable<any> {
    return this.http.get(`${environment.mainAPI}/testimonial?pageNumber=${pageNumber}&pageSize=${pageSize}&isApproved=${isApprove}`);
  }

  CreateTestimonial(request: any, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${environment.mainAPI}/testimonial`, request, { headers });
  }

  UpdateTestimonial(id: number, request: any, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${environment.mainAPI}/testimonial/${id}/${request}`, request, { headers });
  }

  DeleteTestimonial(id: number, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${environment.mainAPI}/testimonial/${id}`, { headers });
  }

  // contact
  SendMessage(request: any) {
    return this.http.post(`${environment.mainAPI}/contact`, request);
  }

  MessagesList(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(`${environment.mainAPI}/contact?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  // projects
  projectList(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(`${environment.mainAPI}/project?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  CreateProject(request: any, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${environment.mainAPI}/project`, request, { headers });
  }

  UpdateProject(id: number, request: any, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${environment.mainAPI}/project/${id}`, request, { headers });
  }

  DeleteProject(id: number, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${environment.mainAPI}/project/${id}`, { headers });
  }

  // posts
  PostsList(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get(`${environment.mainAPI}/post?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  CreatePost(request: any, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${environment.mainAPI}/post`, request, { headers });
  }

  UpdatePost(id: number, request: any, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${environment.mainAPI}/post/${id}`, request, { headers });
  }

  DeletePost(id: number, token: any) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${environment.mainAPI}/post/${id}`, { headers });
  }

  GetPublisheddPosts(pageNumber: number, pageSize: number, isApprove: boolean): Observable<any> {
    return this.http.get(`${environment.mainAPI}/post?pageNumber=${pageNumber}&pageSize=${pageSize}&isApproved=${isApprove}`);
  }
}
