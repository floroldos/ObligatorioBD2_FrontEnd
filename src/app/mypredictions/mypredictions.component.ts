import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { PredictionService } from '../services/predictionservice/prediction.service';
import { GameService } from '../services/gameservice/game.service';

@Component({
  selector: 'app-mypredictions',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    NavbarComponent
  ],
  templateUrl: './mypredictions.component.html',
  styleUrls: ['./mypredictions.component.scss']
})
export class MypredictionsComponent implements OnInit {
  predictions: any[] = [];
  games: any[] = [];

  constructor(private predictionService: PredictionService, private gameService: GameService) { }

  ngOnInit(): void {
    this.loadPredictions();
    this.loadGames();
  }

  async loadPredictions(): Promise<void> {
    try {
      this.predictions = await this.predictionService.getPredictions();
      console.log('Predictions:', this.predictions);
    } catch (err) {
      console.error('Error fetching predictions:', err);
    }
  }

  async loadGames(): Promise<void> {
    try {
      this.games = await this.gameService.getGames();
      console.log('Games:', this.games);
    } catch (err) {
      console.error('Error fetching games:', err);
    }
  }

}
