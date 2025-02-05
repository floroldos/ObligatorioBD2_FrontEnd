import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/permissions-service/permissions.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { RankingComponent } from './ranking/ranking.component';
import { GamesComponent } from './games/games.component';
import { PredictComponent } from './predict/predict.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { ManageTeamsComponent } from './admin/manage-teams/manage-teams.component';
import { ManageGamesComponent } from './admin/manage-games/manage-games.component';
import { TeamsComponent } from './teams/teams.component';
import { ManageCareersComponent } from './admin/manage-careers/manage-careers.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { MypredictionsComponent } from './mypredictions/mypredictions.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'ranking',
        component: RankingComponent,
        canActivate: [AuthGuard]

    },
    {
        path: 'games',
        component: GamesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: AdminViewComponent, children: [
        { path: 'manage-teams', component: ManageTeamsComponent, canActivate: [AuthGuard]},
        { path: 'manage-games', component: ManageGamesComponent, canActivate: [AuthGuard]},
        { path: 'manage-careers', component: ManageCareersComponent, canActivate: [AuthGuard]},
        { path: 'manage-users', component: ManageUsersComponent, canActivate: [AuthGuard]}
        ],
        canActivate: [AuthGuard],
    },
    {
        path: 'teams',
        component: TeamsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'predictions',
        component: PredictComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'see-predictions',
        component: MypredictionsComponent,
        canActivate: [AuthGuard]
    }
];