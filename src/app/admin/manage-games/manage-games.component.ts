import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/gameservice/game.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TeamService } from '../../services/teamservice/team.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-manage-games',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    DropdownModule
  ],
  templateUrl: './manage-games.component.html',
  styleUrl: './manage-games.component.scss'
})
export class ManageGamesComponent {

  games: any[] = [];
  teams: any[] = [];
  gameForm: FormGroup;
  formGroup!: FormGroup;
  addFormGroup!: FormGroup;
  selectedGame: any;
  displayModalSuccess: boolean = false;
  displayModalAdd: boolean = false;
  prevValue1 = 0;
  prevValue2 = 0;
  isLess = false;

  constructor(private gameService: GameService, private teamService: TeamService, private fb: FormBuilder) {
    this.gameForm = this.fb.group({
      scoreTeam1: ['', Validators.required],
      scoreTeam2: ['', Validators.required]
    });

    this.addFormGroup = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      team1: ['', Validators.required],
      team2: ['', Validators.required],
      stadium: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadGames();
    this.loadTeams();
  }

  async loadGames() {
    try {
      this.games = await this.gameService.getGames();
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  }

  async loadTeams(): Promise<void> {
    try {
      var teams = await this.teamService.getTeams();
      this.teams = teams.map((team: { name: any; id: any; }) => ({ label: team.name, id: team.id }));
    } catch (err) {
      console.error('Error fetching careers:', err);
    }
  }

  async addGame(): Promise<void> {
    if (this.addFormGroup.invalid) {
      return;
    }
    const newGame = this.addFormGroup.value;
    console.log('Creating game:', newGame);
    try {
      await this.gameService.addGame(newGame);
      this.displayModalAdd = true;
      console.log('game created successfully');
      this.addFormGroup.reset();
    } catch (error) {
      console.error('Error creating game:', error);
    }
  }

  onSelectGame(game: any) {
    this.selectedGame = game;
    this.gameForm.get('scoreTeam1')?.setValue(game.scoreTeam1)
    this.prevValue1 = game.scoreTeam1;
    this.gameForm.get('scoreTeam2')?.setValue(game.scoreTeam2);
    this.prevValue2 = game.scoreTeam2;
  }

  async onChangeValue(){
    console.log(this.gameForm.value.scoreTeam1);
    console.log(this.prevValue1);
    console.log("-----------------")
    console.log(this.gameForm.value.scoreTeam2);
    console.log(this.prevValue2);
    if (this.gameForm.value.scoreTeam1 < this.prevValue1 || this.gameForm.value.scoreTeam2 < this.prevValue2){
      this.isLess = true;
    }else{
      this.isLess = false;
    }
  }

  async onSubmit() {
    if (this.gameForm.valid) {
      const updatedGame = {
        gameid: this.selectedGame.gameid,
        scoreTeam1: this.gameForm.value.scoreTeam1,
        scoreTeam2: this.gameForm.value.scoreTeam2
      };
      await this.gameService.updateGame(updatedGame);
      this.displayModalSuccess = true;
      this.selectedGame = null;
      await this.loadGames();
    }
  }

  onAccept() {
    this.displayModalSuccess = false;
  }

}
