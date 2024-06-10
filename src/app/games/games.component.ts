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
  constructor(private dataService: DataService, private router: Router) { }
  loading: boolean = false;
  matchDays: any[] = [];
  users: any[] = [];

  ngOnInit() {
    this.users = [
      {
        name: 'Juan Pérez',
        points: 0
      }
    ]
    this.matchDays = [
      {
        date: 'Viernes 28 de junio',
        matches: [
          {
            team1: { name: 'Uruguay', abreviation: 'URU', score: '-', code: 'uy' },
            team2: { name: 'Argentina', abreviation: 'ARG', score: '-', code: 'ar' },
            stage: 'Octavos de Final',
            time: '2024-06-28T22:00:00',
            venue: 'Parque Central, Mdeo',
            predictionEntered: true
          },
          {
            team1: { name: 'Uruguay', abreviation: 'URU', score: '-', code: 'uy' },
            team2: { name: 'Argentina', abreviation: 'ARG', score: '-', code: 'ar' },
            stage: 'Cuartos de Final',
            time: '2024-06-28T00:00:00',
            venue: '',
            predictionEntered: false
          }
        ]
      },
      {
        date: 'Lunes 1 de julio',
        matches: [
          {
            team1: { name: 'Uruguay', abreviation: 'URU', score: '-', code: 'uy' },
            team2: { name: 'Argentina', abreviation: 'ARG', score: '-', code: 'ar' },
            stage: 'Cuartos de Final',
            time: '2024-07-01T22:00:00',
            venue: 'Parque Central, Mdeo',
            predictionEntered: false
          }
        ]
      }
    ];
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