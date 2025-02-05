import { Injectable } from '@angular/core';
import * as jose from 'jose';
import { CookieService } from 'ngx-cookie-service';
import {ApiService} from "../apiservice/api.service";

@Injectable({
  providedIn: 'root'
})

export class UserService {
    constructor(private cookieService: CookieService) {}

    token: string = '';

    GetToken(): string {
        if (this.token == '') {
            this.token = this.cookieService.get('token');
        }

        return this.token;
    }

    GetName(): string {
        let decoded = jose.decodeJwt(this.GetToken());
        return decoded['name'] as string;
    }

    GetLastName(): string {
        let decoded = jose.decodeJwt(this.GetToken());
        return decoded['lastName'] as string;
    }

    GetEmail(): string {
        let decoded = jose.decodeJwt(this.GetToken());
        return decoded['email'] as string;
    }

    GetRole(): string {
        let decoded = jose.decodeJwt(this.GetToken());
        return decoded['role'] as string;
    }

    GetBirthDate(): string {
        let decoded = jose.decodeJwt(this.GetToken());
        return decoded['birthDate'] as string;
    }

    GetCareer(): string {
        let decoded = jose.decodeJwt(this.GetToken());
        return decoded['career'] as string;
    }
}
