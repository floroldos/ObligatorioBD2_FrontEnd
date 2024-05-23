import { Component, OnInit, Input } from '@angular/core';
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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-predict',
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
    FormsModule
  ],
  templateUrl: './predict.component.html',
  styleUrl: './predict.component.scss'
})
export class PredictComponent implements OnInit{
  constructor(private router: Router) { }
  @Input() match: any;
  loading: boolean = false;
  users: any[] = [];

  team1Score: number = 0;
  team2Score: number = 0;

  

  ngOnInit() {
    this.users = [
      {
        name: 'Juan Pérez',
        points: 0
      }
    ]

    this.team1Score = this.match.team1.score;
    this.team2Score = this.match.team2.score;
  }

  savePrediction(): void {
    console.log(`Saved: ${this.team1Score} - ${this.team2Score}`);
    this.router.navigate(['/games']); 
  }

  cancel(): void {
    this.router.navigate(['/games']); 
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

}
