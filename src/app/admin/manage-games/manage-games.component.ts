import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/gameservice/game.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-manage-games',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './manage-games.component.html',
  styleUrl: './manage-games.component.scss'
})
export class ManageGamesComponent {
  games: any[] = [];
  gameForm: FormGroup;
  selectedGame: any;

  constructor(private gameService: GameService, private fb: FormBuilder) {
    this.gameForm = this.fb.group({
      scoreTeam1: ['', Validators.required],
      scoreTeam2: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadGames();
  }

  async loadGames() {
    try {
      this.games = await this.gameService.getGames();
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  }

  onSelectGame(game: any) {
    this.selectedGame = game;
    this.gameForm.patchValue({
      scoreTeam1: game.team1score,
      scoreTeam2: game.team2score
    });
  }

  async onSubmit() {
    if (this.gameForm.valid) {
      try {
        const updatedGame = {
          gameid: this.selectedGame.gameid,
          scoreTeam1: this.gameForm.value.scoreTeam1,
          scoreTeam2: this.gameForm.value.scoreTeam2
        };
        await this.gameService.updateGame(updatedGame);
        this.selectedGame = null;
        this.loadGames();
      } catch (error) {
        console.error('Error updating game:', error);
      }
    }
  }

}
