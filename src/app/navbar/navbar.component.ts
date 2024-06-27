import {Component} from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {CommonModule} from '@angular/common';
import {DataService} from '../data.service';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {MenuModule} from 'primeng/menu';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../services/userservice/user.service';
import {ApiService} from "../services/apiservice/api.service";

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
  userName: string = '';
  points: number = 0;

  constructor(
    private router: Router,
    private cookieService: CookieService,
    public userService: UserService,
    private apiService: ApiService,
  ) {
  }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    if (this.userService.GetRole() === "ADMIN"){
      this.points = 0;
      return;
    }

    try {
      this.userName = this.userService.GetName();
      this.apiService.get("/score/self").then((data) => {
        this.points = data;
      })
    } catch (error) {
      console.error('Failed to fetch user name:', error);
    }
  }

  logout() {
    this.cookieService.delete('token');
    localStorage.clear();
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
    window.location.reload();
  }

  adminView(){
    this.router.navigate(['/admin']);
  }
}
