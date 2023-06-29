import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { MediaComponent } from './pages/media/media.component';
import { DonateComponent } from './pages/donate/donate.component';
import { LoginComponent } from './pages/auth/login.component';
import { DashboardComponent } from './pages/admin/dashboard.component';
import { UnauthComponent } from './layout/unauth/unauth.component';
import { AuthComponent } from './layout/auth/auth.component';

const isLoggedIn = () => redirectLoggedInTo(['admin/dashboard']);
const isNotLoggedIn = () => redirectUnauthorizedTo(['admin/login']);

const routes: Routes = [
  {
    path: '',
    component: UnauthComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'media', component: MediaComponent },
      { path: 'donate', component: DonateComponent },
    ],
  },
  {
    path: 'admin',
    component: AuthComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: isNotLoggedIn },
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: isLoggedIn },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
