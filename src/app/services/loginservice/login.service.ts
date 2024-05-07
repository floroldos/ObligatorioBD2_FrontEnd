import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
    constructor(private http: HttpClient) {}

    public async login(username: string, password: string): Promise<any> {
        return this.http.post(environment.serverUrl + '/login', {
            username: username,
            password: password
        });
    }

}