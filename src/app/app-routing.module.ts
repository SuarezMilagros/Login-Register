import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule), canActivate: [AuthGuard]},
  { path: 'welcome', loadChildren: () => import('./modules/welcome/welcome.module').then(m => m.WelcomeModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
