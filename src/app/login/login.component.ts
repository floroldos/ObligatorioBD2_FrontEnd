import { Component } from '@angular/core';
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
    PasswordModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router) { }
  loading: boolean = false;

  login() {
    // Validación de inicio de sesión. Si el inicio de sesión es exitoso, navega a la página de inicio
    this.router.navigate(['/home']);
  }

  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false
      this.login();
    }, 2000);
  }

}