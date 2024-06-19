import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { RankingService } from '../services/rankingservice/ranking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [
    MenubarModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    FormsModule,
    CommonModule,
    NavbarComponent
  ],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent {

  scores: any[] = [];

  constructor(private router: Router, private rankingService: RankingService) { }

  ngOnInit() : void {
    this.loadRanking();
  }

  async loadRanking() : Promise<void> {
    try {
      this.scores = await this.rankingService.getRanking();
      console.log(this.scores)
    } catch (err) {
      console.error('Error fetching ranking:', err);
    }
  }

}
