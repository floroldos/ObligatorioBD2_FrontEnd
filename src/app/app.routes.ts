import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/permissions-service/permissions.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { RankingComponent } from './ranking/ranking.component';
import { GamesComponent } from './games/games.component';
import { PredictComponent } from './predict/predict.component';
import { AdminViewComponent } from './admin-view/admin-view.component';

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
        path: 'predictions',
        component: PredictComponent
    },
    {
        path: 'admin',
        component: AdminViewComponent
    }
];