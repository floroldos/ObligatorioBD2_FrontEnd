import {Component, inject, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PredictionService} from '../services/predictionservice/prediction.service';
import {PredictionDto} from '../services/predictionservice/prediction.dto';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from '../navbar/navbar.component';
import {FormsModule} from '@angular/forms';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputIconModule} from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

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
    InputIconModule,
    ButtonModule,
    DialogModule
  ]
})
export class PredictComponent {

  id!: number;

  private route = inject(ActivatedRoute);

  teamA!: string;
  teamB!: string;
  displayModalAdd: boolean = false;

  predictionBackend: any;

  prediction: PredictionDto = {
    matchid: 0,
    team1score: 0,
    team2score: 0,
  };

  constructor(private router: Router, private predictionService: PredictionService) {
    this.id = 0;
    this.teamA = '';
    this.teamB = '';
  }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('gameid') || '0', 10);
    this.teamA = this.route.snapshot.paramMap.get('team1') || '';
    this.teamB = this.route.snapshot.paramMap.get('team2') || '';

    this.predictionBackend = JSON.parse(this.route.snapshot.paramMap.get('myPrediction') || '{}');

    if (this.predictionBackend) {
      this.prediction.team1score = this.predictionBackend.team1score;
      this.prediction.team2score = this.predictionBackend.team2score
    }

    this.prediction.matchid = this.id;
  }


  async savePrediction(): Promise<void> {
    try {
      const createdPrediction = await this.predictionService.createPrediction(this.prediction);
      this.displayModalAdd = true;
      console.log('Prediction created successfully:', createdPrediction);
    } catch (error) {
      console.error('Error creating prediction:', error);
    }
  }

  cancel(): void {
    this.router.navigate(['/games']);
  }

  onAccept() {
    this.displayModalAdd = false;
  }

}
