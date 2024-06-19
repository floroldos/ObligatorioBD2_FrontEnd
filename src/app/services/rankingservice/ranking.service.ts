import { Injectable } from '@angular/core';
import { ApiService } from '../apiservice/api.service';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(private apiService : ApiService) {}

  async getRanking(): Promise<any> {
    const path = '/score';
    try {
      const scores = await this.apiService.get<any>(path);
      return scores;
    } catch (error) {
      console.error('Error fetching scores:', error);
      throw error;
    }
  }
}
