import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';
import { RegisterService } from './../../services/userservice/register.service';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    DropdownModule,
    CommonModule,
    DialogModule,
    ButtonModule
  ],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss'
})
export class ManageUsersComponent {
  formGroup!: FormGroup;
  deleteFormGroup!: FormGroup;
  displayModalAdd: boolean = false;
  displayModalDelete: boolean = false;

  constructor(private registerService: RegisterService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      ci: ['', Validators.required],
      password: ['', Validators.required],
      birthdate: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required]
    });

    this.deleteFormGroup = this.fb.group({
      deleteId: [null, Validators.required]
    });
  }

  async addAdmin(): Promise<void> {
    if (this.formGroup.invalid) {
      return;
    }
    const admin = this.formGroup.value;
    console.log('Creating admin:', admin);
    try {
      await this.registerService.registerAdmin(admin);
      this.displayModalAdd = true;
      console.log('admin created successfully');
      this.formGroup.reset();
    } catch (error) {
      console.error('Error creating admin:', error);
    }
  }

  async deleteUser(): Promise<void> {
    if (this.deleteFormGroup.invalid) {
      return;
    }
    const user = this.deleteFormGroup.value.deleteId;
    console.log('Deleting user:', user);
    try {
      await this.registerService.deleteUser(user);
      this.displayModalDelete = true;
      console.log('user deleted successfully');
      this.formGroup.reset();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  onAccept() {
    this.displayModalAdd = false;
    this.displayModalDelete = false;
  }

}
