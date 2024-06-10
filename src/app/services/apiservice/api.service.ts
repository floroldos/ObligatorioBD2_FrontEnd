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
      headers = headers.append("Authorization", auth);
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

  async get<T> (path: string, params?: HttpParams): Promise<any> {
    const headers = await this.getHttpHeaders();
      return this.http.get<T>(this.getURL(path), { headers, params }).toPromise();
  }

  async post<T> (path: string, body: any): Promise<any> {
    const headers = await this.getHttpHeaders();
      return this.http.post<T>(this.getURL(path), body, { headers }).toPromise();
  }

  async put<T> (path: string, body: any): Promise<any> {
    const headers = await this.getHttpHeaders();
      return this.http.put<T>(this.getURL(path), body, { headers }).toPromise();
  }

  async delete<T> (path: string): Promise<any> {
    const headers = await this.getHttpHeaders();
      return this.http.delete<T>(this.getURL(path), { headers }).toPromise();
  }

  async patch<T> (path: string, body: any): Promise<any> {
    const headers = await this.getHttpHeaders();
      return this.http.patch<T>(this.getURL(path), body, { headers }).toPromise();
  }
}
