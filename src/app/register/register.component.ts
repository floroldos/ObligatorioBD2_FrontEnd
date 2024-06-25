import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/userservice/register.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoFocusModule } from 'primeng/autofocus';
import { StepsModule } from 'primeng/steps';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamService } from '../services/teamservice/team.service';
import { DropdownModule } from 'primeng/dropdown';
import { CareerService } from '../services/career.service/career.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    PasswordModule,
    AutoFocusModule,
    StepsModule,
    InputNumberModule,
    CalendarModule,
    ReactiveFormsModule,
    DropdownModule
  ]
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  formGroup!: FormGroup;
  currentStep: number = 0;
  teams: any[] = [];
  countries: any[] = [];
  careers: any[] = [];

  items = [
    { label: 'Datos Personales' },
    { label: 'Selección de Equipos' }
  ];

  cd: ChangeDetectorRef;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private registerService: RegisterService,
    private teamService: TeamService,
    private careerService: CareerService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.cd = changeDetectorRef;
    this.formGroup = this.fb.group({
      ci: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthdate: ['', Validators.required],
      champion: ['', Validators.required],
      secondPlace: ['', Validators.required],
      career: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTeams();
    this.loadCareers();
  }

  // Para cargar datos de los equipos y carreras

  async loadTeams(): Promise<void> {
    try {
      var teams = await this.teamService.getTeams();
      this.countries = teams.map((team: { country: any; id: any; }) => ({ label: team.country, value: team.id }));
      this.cd.detectChanges();
    } catch (err) {
      console.error('Error fetching teams:', err);
    }
  }

  async loadCareers(): Promise<void> {
    try {
      var careers = await this.careerService.getCareers();
      this.careers = careers.map((team: { name: any; id: any; }) => ({ label: team.name, value: team.id }));
      this.cd.detectChanges();
    } catch (err) {
      console.error('Error fetching careers:', err);
    }
  }

  // Formateo de fecha para cargar

  formatDate(): string {
    var date = this.formGroup.value.birthdate;
    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }


  // Para el cambio de pasos

  nextStep() {
    if (this.currentStep === 0) {
      if (this.formGroup.get('name')?.valid &&
        this.formGroup.get('ci')?.valid &&
        this.formGroup.get('email')?.valid &&
        this.formGroup.get('birthdate')?.valid &&
        this.formGroup.get('lastName')?.valid &&
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
      this.loading = true;
      var championValue = this.formGroup.value.champion.value;
      var secondPlaceValue = this.formGroup.value.secondPlace.value;
      var careerValue = this.formGroup.value.career.value;
      var formattedDate = this.formatDate();

      this.formGroup.patchValue({
        birthdate: formattedDate
      });

      this.formGroup.patchValue({
        career: careerValue
      });

      this.formGroup.patchValue({
        champion: championValue,
        secondPlace: secondPlaceValue
      });

      console.log(this.formGroup.value);
      this.registerService.register(this.formGroup.value).subscribe(
        (response) => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          this.loading = false;
          console.error('Registration failed', error);
        }
      );
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this.register();
    }, 2000);
  }

  markAllFieldsAsTouched() {
    Object.values(this.formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}