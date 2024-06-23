import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { NavbarComponent } from '../navbar/navbar.component';
import { TeamService } from '../services/teamservice/team.service';
import { CommonModule } from '@angular/common';
import CountryList from 'country-list-with-dial-code-and-flag';
@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [
    MenubarModule,
    NavbarComponent,
    CommonModule
  ],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teams: any[] = [];

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.loadTeams();
  }

  async loadTeams(): Promise<void> {
    try {
      this.teams = await this.teamService.getTeams();
    } catch (err) {
      console.error('Error fetching teams:', err);
    }
  }
}
