import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MenuModule } from 'primeng/menu';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { GameService } from '../services/gameservice/game.service';
import { TeamService } from '../services/teamservice/team.service';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [
    MenubarModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    CommonModule,
    IconFieldModule,
    InputIconModule,
    MenuModule,
    NavbarComponent
  ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent implements OnInit {
  loading: boolean = false;
  games: any[] = [];
  teams: any[] = [];

  constructor(private router: Router, private gameService: GameService, private teamService: TeamService) { }

  ngOnInit() : void {
    this.loadGames();
    this.loadTeams();
  }

  async loadGames() : Promise<void> {
    try {
      this.games = await this.gameService.getGames();
      console.log(this.games)
    } catch (err) {
      console.error('Error fetching games:', err);
    }
  }

  async loadTeams() : Promise<void> {
    try {
      this.teams = await this.teamService.getTeams();
      console.log(this.games)
    } catch (err) {
      console.error('Error fetching games:', err);
    }
  }

  getButtonLabel(match: any): string {
    const matchTime = new Date(match.time).getTime();
    const currentTime = new Date().getTime();
    const twoHoursInMillis = 2 * 60 * 60 * 1000;

    if (match.predictionEntered) {
      return (matchTime - currentTime > twoHoursInMillis) ? 'Editar predicción' : 'Predicción cerrada';
    } else {
      return 'Ingresar predicción';
    }
  }

  editPrediction(match: any): void {
    this.router.navigate(['/predictions'], { state: { match } });
  }
}