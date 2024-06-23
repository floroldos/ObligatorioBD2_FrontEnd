import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PredictionService } from '../services/predictionservice/prediction.service';
import { PredictionDto } from '../services/predictionservice/prediction.dto';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-predict',
  standalone: true,
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.scss'],
  imports: [
    CommonModule,
    NavbarComponent,
    FormsModule,
    InputNumberModule,
    InputIconModule
  ]
})
export class PredictComponent {

  @Input() id!: number;

  prediction: PredictionDto = {
    gameId: this.id,
    team1score: 0,
    team2score: 0 
  };

  constructor(private router: Router, private predictionService: PredictionService) { }

  async savePrediction(): Promise<void> {
    console.log(this.id)
    try {
      const createdPrediction = await this.predictionService.createPrediction(this.prediction);
      console.log('Prediction created successfully:', createdPrediction);
    } catch (error) {
      console.error('Error creating prediction:', error);
    }
  }

  cancel(): void {
    this.router.navigate(['/games']); 
  }

}
