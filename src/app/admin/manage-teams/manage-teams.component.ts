import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from './../../services/teamservice/team.service';
import { ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-manage-teams',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule
  ],
  templateUrl: './manage-teams.component.html',
  styleUrl: './manage-teams.component.scss'
})
export class ManageTeamsComponent {
  addTeamForm!: FormGroup;
  deleteTeamForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private teamService: TeamService) { }

  ngOnInit(): void {
    this.addTeamForm = this.formBuilder.group({
      teamName: ['', Validators.required],
    });

    this.deleteTeamForm = this.formBuilder.group({
      deleteTeamName: ['', Validators.required],
    });
  }

  onSubmitAddTeam(): void {
    if (this.addTeamForm.valid) {
      const teamData = this.addTeamForm.value;
      this.teamService.addTeam(teamData).then(
        response => {
          console.log('Equipo agregado exitosamente:', response);
          this.addTeamForm.reset();
        },
        error => {
          console.error('Error al agregar equipo:', error);
        }
      );
    }
  }

  onSubmitDeleteTeam(): void {
    if (this.deleteTeamForm.valid) {
      const deleteTeamData = this.deleteTeamForm.value;
      this.teamService.deleteTeam(deleteTeamData).then(
        response => {
          console.log('Equipo eliminado exitosamente:', response);
          this.deleteTeamForm.reset();
        },
        error => {
          console.error('Error al eliminar equipo:', error);
        }
      );
    }
  }

}
