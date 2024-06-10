import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

interface Ranking {
  position: number;
  name: string;
  points: number;
}

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

  rankings: Ranking[] =
  [
    { position: 1, name: 'John', points: 100 },
    { position: 2, name: 'Jane', points: 90 },
    { position: 3, name: 'Bob', points: 80 },
    { position: 4, name: 'Alice', points: 70 },
    { position: 5, name: 'Mike', points: 60 }
  ]
  showRanking = true;

}
