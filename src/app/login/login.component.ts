import { Component, Inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { AutoFocusModule } from 'primeng/autofocus';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    DividerModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    PasswordModule,
    AutoFocusModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loading: boolean = false;
  loginGroup = new FormGroup({
    ci: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  loginStatus = {
    error: false,
    message: 'Usuario o contraseña incorrectos. Por favor, inténtelo nuevamente.'
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    if (this.cookieService.check('token')) {
      this.http.post(environment.serverUrl + "/auth/token", { token: this.cookieService.get('token') }).subscribe((res: any) => {
        if (res.token == null) {
          this.loginStatus.error = true;
          this.loginStatus.message = "Token inválido. Por favor, inicie sesión nuevamente.";
          this.cookieService.delete('token');
        } else {
          const userRole = localStorage.getItem('userRole');
          if (userRole === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/home']);
          }
        }
      });
    }
  }

  login() {
    if (this.loginGroup.invalid) {
      console.log('Invalid form');
      return;
    }

    this.loading = true;

    this.http.post(environment.serverUrl + "/auth/login", this.loginGroup.value).subscribe((res: any) => {
      this.loading = false;

      if (res.token == null) {
        this.loginStatus.error = true;
        this.loginStatus.message = res.message;
      } else {
        this.cookieService.set('token', res.token, 365);
        localStorage.setItem('userRole', res.role);

        if (res.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
      }
    }, (error) => {
      this.loading = false;
      console.error('Error during login:', error);
      this.loginStatus.error = true;
      this.loginStatus.message = "Ocurrió un error durante el inicio de sesión.";
    });
  }
}