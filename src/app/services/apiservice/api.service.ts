import { Injectable, inject } from '@angular/core';
import { UserService } from '../userservice/user.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    constructor(private user: UserService, private http: HttpClient) {}
    
    public async get(url: string): Promise<any> {
        return this.http.get(url, {
            headers: {
                "Authorization": "Bearer " + this.user.GetToken(),
            }
        });
    }

    public async post(url: string, data: any): Promise<any> {
        return this.http.post(url, data, {
            headers: {
                "Authorization": "Bearer " + this.user.GetToken(),
            }
        });
    }

    public async put(url: string, data: any): Promise<any> {
        return this.http.put(url, data, {
            headers: {
                "Authorization": "Bearer " + this.user.GetToken(),
            }
        });
    }
}