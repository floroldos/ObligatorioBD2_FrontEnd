import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { UserService } from './../../services/userservice/user.service';

@Component({
  selector: 'app-manage-careers',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './manage-careers.component.html',
  styleUrl: './manage-careers.component.scss'
})
export class ManageCareersComponent {
  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  userForm!: FormGroup;
  adminForm!: FormGroup;
  disableUserForm!: FormGroup;

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
    });

    this.adminForm = this.formBuilder.group({
      adminUsername: ['', Validators.required],
    });

    this.disableUserForm = this.formBuilder.group({
      disableUsername: ['', Validators.required],
    });
  }
/*
  onSubmitUser(): void {
    if (this.userForm.valid) {
      // Lógica para enviar datos de creación de usuario al servicio
      const userData = this.userForm.value;
      this.userService.createUser(userData).subscribe(
        response => {
          // Manejar respuesta exitosa
          console.log('Usuario creado exitosamente:', response);
          // Reiniciar formulario o realizar otras acciones necesarias
          this.userForm.reset();
        },
        error => {
          // Manejar error
          console.error('Error al crear usuario:', error);
        }
      );
    }
  }
    */
/*
  onSubmitAdmin(): void {
    if (this.adminForm.valid) {
      // Lógica para enviar datos de adición de administrador al servicio
      const adminData = this.adminForm.value;
      this.userService.addAdmin(adminData).subscribe(
        response => {
          // Manejar respuesta exitosa
          console.log('Administrador agregado exitosamente:', response);
          // Reiniciar formulario o realizar otras acciones necesarias
          this.adminForm.reset();
        },
        error => {
          // Manejar error
          console.error('Error al agregar administrador:', error);
        }
      );
    }
  }
  onSubmitDisableUser(): void {
    if (this.disableUserForm.valid) {
      // Lógica para enviar datos de deshabilitación de usuario al servicio
      const disableUserData = this.disableUserForm.value;
      this.userService.disableUser(disableUserData).subscribe(
        response => {
          // Manejar respuesta exitosa
          console.log('Usuario deshabilitado exitosamente:', response);
          // Reiniciar formulario o realizar otras acciones necesarias
          this.disableUserForm.reset();
        },
        error => {
          // Manejar error
          console.error('Error al deshabilitar usuario:', error);
        }
      );
    }
  }
    */

}
