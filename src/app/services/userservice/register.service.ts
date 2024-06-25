import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiService } from '../apiservice/api.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseUrl = environment.serverUrl + '/auth';

  constructor(private http: HttpClient, private apiService : ApiService) { }

  register(registerData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, registerData);
  }

  async registerAdmin(admin: any): Promise<any> {
    const path = '/admin/register';
    try {
      return await this.apiService.post<any>(path, admin);
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error;
    }
  }

  async deleteUser(userId: any): Promise<any> {
    const path = '/admin/user/' + userId;
    try {
      return await this.apiService.delete<any>(path);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}
