import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MenuModule } from 'primeng/menu';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../services/apiservice/api.service';
import { environment } from '../../environments/environment.development';

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
    NavbarComponent,
  ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService) { }
  loading: boolean = false;
  games: any[] = [];
  teams: any[] = [];

  async loadGames() : Promise<void> {
    try {
      this.games = await this.apiService.getGames();
      console.log(this.games)
    } catch (err) {
      console.error('Error fetching games:', err);
    }
  }

  ngOnInit() {
    this.loadGames();
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

  async logout() {
    this.router.navigate(['/home']);    
  }

  load() {
    this.loading = true;
    this.logout();
    this.loading = false;
    setTimeout(() => {
    }, 2000);
    
  }

  editPrediction(match: any): void {
    this.router.navigate(['/predictions'], { state: { match } });
  }
}