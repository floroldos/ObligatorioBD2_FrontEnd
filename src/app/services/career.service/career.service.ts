import { Injectable } from '@angular/core';
import { ApiService } from '../apiservice/api.service';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private apiService : ApiService) {}

  async getCareers(): Promise<any> {
    const path = '/career';
    try {
      const careers = await this.apiService.get<any>(path);
      return careers;
    } catch (error) {
      console.error('Error fetching careers:', error);
      throw error;
    }
  }
}
