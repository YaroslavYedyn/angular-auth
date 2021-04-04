import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AccountComponent} from './components/account/account.component';
import {NotFoundComponent} from './components/not-found/not-found.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'account', component: AccountComponent},
  {path: 'auth', loadChildren: () => import('./components/auth/auth.module').then((m) => m.AuthModule)},
  {path: 'error', loadChildren: () => import('./components/error/error.module').then((m) => m.ErrorModule)},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
