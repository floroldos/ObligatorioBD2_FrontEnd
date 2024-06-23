import { Injectable, inject } from '@angular/core';
import { UserService } from '../userservice/user.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers = new Headers();

  constructor(private user: UserService, private http: HttpClient) {}

  private async getHttpHeaders(): Promise<HttpHeaders> {
    let headers: HttpHeaders = new HttpHeaders();
    let auth: string | null  = this.user.GetToken();
    if (auth) {
      headers = headers.append('Authorization', `Bearer ${auth}`);
    }
    headers = headers.append("Content-Type", "application/json");
    headers = headers.append("Accept", "application/json");
    return headers;
  }

  getURL(path: string): string {
    if (path.startsWith("/"))
      return "http://localhost:8080" + path;
    else
      return "http://localhost:8080/" + path;
  }

  async get<T>(path: string, params?: HttpParams): Promise<any> {
    try {
      const headers = await this.getHttpHeaders();
      return this.http.get<any>(this.getURL(path), { headers, params }).toPromise();
    } catch (error) {
      console.error('Error en la solicitud GET:', error);
      throw error;
    }
  }

  async post<T>(path: string, body: any): Promise<any> {
    try {
      const headers = await this.getHttpHeaders();
      return this.http.post<any>(this.getURL(path), body, { headers }).toPromise();
    } catch (error) {
      console.error('Error en la solicitud POST:', error);
      throw error;
    }
  }  

  async put<T> (path: string, body: any): Promise<any> {
    const headers = await this.getHttpHeaders();
      return this.http.put<T>(this.getURL(path), body, { headers }).toPromise();
  }

  async delete<T> (path: string): Promise<any> {
    const headers = await this.getHttpHeaders();
      return this.http.delete<T>(this.getURL(path), { headers }).toPromise();
  }
}
