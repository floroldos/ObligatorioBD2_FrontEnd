import { Injectable } from '@angular/core';
import { ApiService } from '../apiservice/api.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private apiService : ApiService) {}

  async getGames(): Promise<any> {
    const path = '/game';
    try {
      const games = await this.apiService.get<any>(path);
      return games;
    } catch (error) {
      console.error('Error fetching games:', error);
      throw error;
    }
  }
}
