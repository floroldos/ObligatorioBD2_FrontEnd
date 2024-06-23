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
      console.log(teams);
      return teams;
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  }

  //admin solamente
  async addTeam(team: any): Promise<any> {
    const path = '/admin/team';
    try {
      return await this.apiService.post<any>(path, team);
    } catch (error) {
      console.error('Error updating team:', error);
      throw error;
    }
  }

  async deleteTeam(team: string): Promise<any> {
    const path = `/admin/team/${team}`;
    try {
      return await this.apiService.delete<any>(path);
    } catch (error) {
      console.error('Error deleting team:', error);
      throw error;
    }
  }
}
