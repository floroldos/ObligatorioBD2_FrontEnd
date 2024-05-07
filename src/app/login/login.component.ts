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
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { LoginService } from '../services/loginservice/login.service';

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
  constructor(private router: Router, private log: LoginService) { }
  loading: boolean = false;

  loginGroup = new FormGroup({
    ci: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });


  async login() {
    if (this.loginGroup.invalid) {
      console.log('Invalid form');
      return;
    }

    if (this.loginGroup.value.ci != null && this.loginGroup.value.password != null) {
      this.log.login(this.loginGroup.value.ci, this.loginGroup.value.password).then((response) => {
        console.log(response);
      });
  
      //this.router.navigate(['/home']);
    }
  }

  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.login();
    }, 2000);
  }

}