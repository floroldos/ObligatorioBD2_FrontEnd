import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [
    MenubarModule,
    NavbarComponent
  ],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent {

}
