import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=> import('../app/pages/landing/landing.module').then(
      (m)=> m.LandingModule
      )
  },
  {
    path:'',
    loadChildren:()=> import('../app/pages/auth/auth.module').then(
      (m)=> m.AuthModule
      )
  },
  {
    path:'app',
    loadChildren:()=> import('../app/pages/dashboard/dashboard.module').then(
      (m)=> m.DashboardModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
