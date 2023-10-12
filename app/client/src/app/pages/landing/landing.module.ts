import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';


@NgModule({
  declarations: [
    LandingComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
