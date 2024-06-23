import { Component, OnInit } from '@angular/core';
import { RankingService } from '../services/rankingservice/ranking.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    TableModule
  ]
})
export class RankingComponent implements OnInit {

  scores: any[] = [];

  constructor(private rankingService: RankingService) { }

  ngOnInit(): void {
    this.loadRanking();
  }

  async loadRanking(): Promise<void> {
    try {
      const response = await this.rankingService.getRanking();
      this.scores = response.scores;
      console.log(this.scores);
    } catch (err) {
      console.error('Error fetching ranking:', err);
    }
  }

}
