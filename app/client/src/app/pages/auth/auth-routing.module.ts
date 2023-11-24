import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from 'src/app/components/login-page/login-page.component';
import { SignUpComponent } from 'src/app/components/sign-up/sign-up.component';
import { UserAuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [UserAuthGuard] },
  { path: 'signup', component: SignUpComponent, canActivate: [UserAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
