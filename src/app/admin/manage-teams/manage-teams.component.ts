import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from './../../services/teamservice/team.service';
import { ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-manage-teams',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    DropdownModule,
    DialogModule,
    ButtonModule
  ],
  templateUrl: './manage-teams.component.html',
  styleUrl: './manage-teams.component.scss'
})
export class ManageTeamsComponent {
  formGroup!: FormGroup;
  deleteFormGroup!: FormGroup;
  teams: any[] = [];
  displayModalAdd: boolean = false;
  displayModalDelete: boolean = false;

  constructor(private teamService: TeamService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      countryid: ['', Validators.required],
      name: ['', Validators.required],
      country: ['', Validators.required]
    });

    this.deleteFormGroup = this.fb.group({
      teamIdDelete: [null, Validators.required]
    });

    this.loadTeams();
  }

  async loadTeams(): Promise<void> {
    try {
      var teams = await this.teamService.getTeams();
      this.teams = teams.map((team: { name: any; id: any; }) => ({ label: team.name, id: team.id }));
    } catch (err) {
      console.error('Error fetching careers:', err);
    }
  }

  async addTeam(): Promise<void> {
    if (this.formGroup.invalid) {
      return;
    }
    const team = this.formGroup.value;

    console.log('Creating team:', team);
    try {
      await this.teamService.addTeam(team);
      this.displayModalAdd = true;
      console.log('Team created successfully');
      this.formGroup.reset();
      this.loadTeams();
    } catch (error) {
      console.error('Error creating team:', error);
    }
  }

  async deleteTeam(): Promise<void> {
    if (this.deleteFormGroup.invalid) {
      return;
    }
    var teamIdDelete = this.deleteFormGroup.value.teamIdDelete.id;
    console.log('Deleting team:', teamIdDelete);
    try {
      await this.teamService.deleteTeam(teamIdDelete);
      this.displayModalDelete = true;
      console.log('team deleted successfully');
      this.deleteFormGroup.reset();
      this.loadTeams();
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  }

  onAccept() {
    this.displayModalAdd = false;
    this.displayModalDelete = false;
  }

}
