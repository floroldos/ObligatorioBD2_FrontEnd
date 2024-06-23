import { Injectable } from '@angular/core';
import { ApiService } from '../apiservice/api.service';
import { PredictionDto } from './prediction.dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PredictionService {

    constructor(private apiService: ApiService, private http: HttpClient) { }
    
    async createPrediction(predictionDto: PredictionDto): Promise<any> {
        const path = '/prediction';
        try {
          return this.http.post<any>(this.apiService.getURL(path), predictionDto).toPromise();
        } catch (error) {
          console.error('Error creating prediction:', error);
          throw error;
        }
      }
}
