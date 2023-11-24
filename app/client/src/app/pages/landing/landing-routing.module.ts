import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { UserLoginGuard } from 'src/app/guard/logged.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,canActivate:[UserLoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
