import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { HeadingComponent } from 'src/app/components/heading/heading.component';
import {
  heroBolt,
} from '@ng-icons/heroicons/outline';
import { NgIconsModule } from '@ng-icons/core';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    HeadingComponent,
    NgIconsModule.withIcons({ heroBolt }),
  ]
})
export class SettingsModule { }
