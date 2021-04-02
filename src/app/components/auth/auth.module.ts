import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AuthComponent} from './auth.component';
import {ActivateComponent} from './components/activate/activate.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CheckComponent} from './components/check/check.component';
import {ForgotComponent} from './components/forgot/forgot.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';


const routes: Routes = [
  {path: '', component: AuthComponent},
  {path: 'login', component: LoginComponent},
  {path: 'activate', component: ActivateComponent},
  {path: 'check', component: CheckComponent},
  {path: 'forgot', component: ForgotComponent},
  {path: 'changePassword', component: ChangePasswordComponent},
];

@NgModule({
  declarations: [LoginComponent, AuthComponent, ActivateComponent, CheckComponent, ForgotComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class AuthModule {
}
