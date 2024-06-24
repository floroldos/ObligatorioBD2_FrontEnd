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
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; 

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
    StepsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent{
  constructor(private router: Router, private fb: FormBuilder) { 

    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      cedula: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', Validators.required],
      surname: ['', Validators.required],
      career: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      champion: ['', Validators.required],
      runnerup: ['', Validators.required]
    });

  }

  loading: boolean = false;
  formGroup!: FormGroup;
  currentStep: number = 0;

  items = [
    { label: 'Datos Personales' },
    { label: 'Selección de Equipos' }
  ];

  nextStep() {
    if (this.currentStep === 0) {
      if (this.formGroup.get('name')?.valid &&
          this.formGroup.get('cedula')?.valid &&
          this.formGroup.get('email')?.valid &&
          this.formGroup.get('birthdate')?.valid &&
          this.formGroup.get('surname')?.valid &&
          this.formGroup.get('career')?.valid &&
          this.formGroup.get('password')?.valid) {
        this.currentStep = 1;
      } else {
        this.formGroup.markAllAsTouched();
      }
    }
  }

  register() {
    if (this.formGroup.valid) {
      // Lógica para registrar el usuario
      this.router.navigate(['/login']);
      console.log('Formulario enviado', this.formGroup.value);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false
      this.register();
    }, 2000);
  }

  markAllFieldsAsTouched() {
    Object.values(this.formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

}
