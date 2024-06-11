import { Injectable } from '@angular/core';
import { ApiService } from '../apiservice/api.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private apiService : ApiService) {}

  async getTeams(): Promise<any> {
    const path = '/team';
    try {
      const teams = await this.apiService.get<any>(path);
      return teams;
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  }
}
