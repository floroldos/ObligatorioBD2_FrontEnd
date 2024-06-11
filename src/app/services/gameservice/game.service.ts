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

  //admin solamente
  async updateGame(game: any): Promise<any> {
    const path = '/admin/game/update';
    try {
      return await this.apiService.post<any>(path, game);
    } catch (error) {
      console.error('Error updating game scores:', error);
      throw error;
    }
  }
  

}
