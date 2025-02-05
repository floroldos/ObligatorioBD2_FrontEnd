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
import {UserService} from "../services/userservice/user.service";

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
  games: any;
  teams: any[] = [];

  constructor(private router: Router, private gameService: GameService, private teamService: TeamService, public userService: UserService) { }

  ngOnInit() : void {
    this.loadGames();
    this.loadTeams();
  }

  async loadGames() : Promise<any> {
    try {
      this.games = await this.gameService.getGames();
      console.log('Games:', this.games);
      console.log(this.games.inProgressGames)
    } catch (err) {
      console.error('Error fetching games:', err);
    }
  }

  async loadTeams() : Promise<void> {
    try {
      this.teams = await this.teamService.getTeams();
    } catch (err) {
      console.error('Error fetching games:', err);
    }
  }

  editPrediction(match: any){
    let matchC = structuredClone(match);
    matchC.myPrediction = JSON.stringify(matchC.myPrediction)
    this.router.navigate(['/predictions', matchC]);
  }

  enterPrediction(match: any) {
    this.router.navigate(['/predictions', match]);
  }

  isTooLate(date: string, time: string) {
    let partidoDate = new Date(date);
    let timeSplit = time.split(':');
    partidoDate.setHours(parseInt(timeSplit[0]));
    partidoDate.setMinutes(parseInt(timeSplit[1]));

    let currentTime = new Date();

    return partidoDate.getTime() - currentTime.getTime() < 3600000;
  }
}
