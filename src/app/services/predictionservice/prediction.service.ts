import { Injectable } from '@angular/core';
import { ApiService } from '../apiservice/api.service';
import { PredictionDto } from './prediction.dto';

@Injectable({
    providedIn: 'root'
})
export class PredictionService {

    constructor(private apiService: ApiService) { }
    
    async createPrediction(predictionDto: PredictionDto): Promise<any> {
        const path = '/prediction';
        console.log('PredictionDto:', predictionDto);
        try {
          return this.apiService.post<any>(path, predictionDto);
        } catch (error) {
          console.error('Error creating prediction:', error);
          throw error;
        }
    }
}
