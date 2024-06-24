import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ManageGamesComponent } from '../admin/manage-games/manage-games.component';

@Component({
  selector: 'app-admin-view',
  standalone: true,
  imports: [
    NavbarComponent,
    PanelMenuModule,
    BadgeModule,
    CommonModule,
    ManageGamesComponent
  ],
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.scss'
})
export class AdminViewComponent {

  items: MenuItem[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'ADMIN') {
      this.items = [
        {
          label: 'Administrar Usuarios',
          icon: 'pi pi-fw pi-cog',
          command: () => { this.navigateTo('manage-users'); }
        },
        {
          label: 'Administrar Equipos',
          icon: 'pi pi-fw pi-cog',
          command: () => { this.navigateTo('manage-teams'); }
        },
        {
          label: 'Administrar Partidos',
          icon: 'pi pi-fw pi-cog',
          command: () => { this.navigateTo('manage-games'); }
        },
        {
          label: 'Administrar Carreras',
          icon: 'pi pi-fw pi-cog',
          command: () => { this.navigateTo('manage-careers'); }
        }
      ];
      this.router.navigate(['/admin/manage-users']);
    } else {
      this.router.navigate(['/login']);}
  }

  navigateTo(route: string) {
    this.router.navigate([`/admin/${route}`]);
  }

}
