import { Injectable } from '@angular/core';
import { ApiService } from '../apiservice/api.service';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private apiService: ApiService) {}

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

  async createCareer(career: any): Promise<any> {
    const path = 'admin/career';
    try {
      const createdCareer = await this.apiService.post<any>(path, { name: career });
      return createdCareer;
    } catch (error) {
      console.error('Error creating career:', error);
      throw error;
    }
  }

  async deleteCareer(careerId: number): Promise<any> {
    const path = 'admin/career/' + careerId;
    try {
      const deletedCareer = await this.apiService.delete<any>(path);
      return deletedCareer;
    } catch (error) {
      console.error('Error deleting career:', error);
      throw error;
    }
  }
}
