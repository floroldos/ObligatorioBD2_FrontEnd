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
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { StepsModule } from 'primeng/steps';
@Component({
  selector: 'app-register',
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
    CalendarModule,
    InputNumberModule,
    CommonModule,
    FormsModule,
    DropdownModule,
    StepsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private router: Router) { }
  loading: boolean = false;
  currentStep: number = 1;
  countries: any[] = [
    { label: 'Argentina', value: 'AR' },
    { label: 'Brasil', value: 'BR' },
  ];
  selectedChampion: string | null = null;
  selectedRunnerUp: string | null = null;

  items: any[] = [
    { label: 'Datos Personales' },
    { label: 'Selección de Equipos' }
  ];

  nextStep() {
    if (this.currentStep < 2) {
      this.currentStep++;
    } else {
    }
  }

  register() {
    // Validación de registro. Si es exitoso, navega a la página de inicio o al login
    this.router.navigate(['/login']);
  }

  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false
      this.register();
    }, 2000);
  }

}
