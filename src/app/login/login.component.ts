import { Component, Inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    DividerModule,
    ToastModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService) {}

  loading: boolean = false;

  loginGroup = new FormGroup({
    ci: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });


  loginStatus = {
    error: false,
    message: ''
  }

  async ngOnInit() {
    if (this.cookieService.check('token')) {
      this.http.post(environment.serverUrl + "/auth/token", { token: this.cookieService.get('token') }).subscribe((res: any) => {
        if (res.token == null) {
          this.loginStatus.error = true;
          this.loginStatus.message = "Token inválido. Por favor, inicie sesión nuevamente."
          this.cookieService.delete('token');
        } else {
          this.router.navigate(['/home']);
        }
      });
    }
  }


  async login() {
    if (this.loginGroup.invalid) {
      console.log('Invalid form');
      return;
    }

    if (this.loginGroup.value.ci != null && this.loginGroup.value.password != null) {
      this.http.post(environment.serverUrl + "/auth/login", this.loginGroup.value).subscribe((res: any) => {
        console.log(res);
        if (res.token == null) {
          this.loginStatus.error = true;
          this.loginStatus.message = res.message;
        } else {
          this.cookieService.set('token', res.token, 365);
          this.router.navigate(['/home']);
        }
      });
    }
  }

  load() {
    this.loading = true;
    
    this.login();

    this.loading = false;
    setTimeout(() => {
    }, 2000);
    
  }

}