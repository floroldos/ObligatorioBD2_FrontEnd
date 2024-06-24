import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-view',
  standalone: true,
  imports: [
    NavbarComponent,
    PanelMenuModule,
    BadgeModule
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
          icon: 'pi pi-user-plus',
          command: () => { this.navigateTo('manage-users'); }
        },
        {
          label: 'Administrar Equipos',
          icon: 'pi pi-users',
          command: () => { this.navigateTo('manage-teams'); }
        },
        {
          label: 'Administrar Partidos',
          icon: 'pi pi-calendar-plus',
          command: () => { this.navigateTo('manage-games'); }
        }
      ];
    } else {
      this.router.navigate(['/login']);}
  }

  navigateTo(route: string) {
    this.router.navigate([`/admin/${route}`]);
  }

}
