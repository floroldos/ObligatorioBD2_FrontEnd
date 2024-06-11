import { Component } from '@angular/core';
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
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/userservice/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenubarModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    CommonModule,
    IconFieldModule,
    InputIconModule,
    MenuModule
    ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  loading: boolean = false;
  userName: string = '';

  constructor(private router: Router, private cookieService: CookieService, private userService:UserService) { }

  ngOnInit() {
    this.getUserName();
  }

  async getUserName() {
    try {
      this.userName = this.userService.GetName();
    } catch (error) {
      console.error('Failed to fetch user name:', error);
    }
  }

  logout() {
    this.router.navigate(['/login']);   
    this.cookieService.delete('token');
  }
}
