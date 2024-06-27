import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { UserService } from './../../services/userservice/user.service';
import { CareerService } from './../../services/career.service/career.service';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-manage-careers',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    CommonModule,
    DialogModule,
    ButtonModule

  ],
  templateUrl: './manage-careers.component.html',
  styleUrl: './manage-careers.component.scss'
})
export class ManageCareersComponent implements OnInit {
  formGroup!: FormGroup;
  deleteFormGroup!: FormGroup;
  careers: any[] = [];
  displayModalAdd: boolean = false;
  displayModalDelete: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private careerService: CareerService,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      career: ['', Validators.required]
    });

    this.deleteFormGroup = this.fb.group({
      careerIdDelete: [null, Validators.required]
    });

    this.loadCareers();
  }

  async loadCareers(): Promise<void> {
    try {
      var careers = await this.careerService.getCareers();
      console.log('Careers:', careers);
      this.careers = careers.map((career: { name: any; id: any; }) => ({ label: career.name, id: career.id }));
    } catch (err) {
      console.error('Error fetching careers:', err);
    }
  }

  async addCareer(): Promise<void> {
    if (this.formGroup.invalid) {
      return;
    }
    const career = this.formGroup.value.career;
    try {
      await this.careerService.createCareer(career);
      this.displayModalAdd = true;
      console.log('Career created successfully');
      this.formGroup.reset();
      this.loadCareers();
    } catch (error) {
      console.error('Error creating career:', error);
    }
  }

  async deleteCareer(): Promise<void> {
    if (this.deleteFormGroup.invalid) {
      return;
    }
    const careerIdDelete = this.deleteFormGroup.value.careerIdDelete.id;
    console.log('Deleting career:', careerIdDelete);
    try {
      await this.careerService.deleteCareer(careerIdDelete);
      this.displayModalDelete = true;
      console.log('Career deleted successfully');
      this.deleteFormGroup.reset();
      this.loadCareers();
    } catch (error) {
      console.error('Error deleting career:', error);
    }
  }

  onAccept() {
    this.displayModalAdd = false;
    this.displayModalDelete = false;
  }
}