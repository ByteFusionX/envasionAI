import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { NgIconsModule } from '@ng-icons/core';
import {
  heroHome,
  heroChatBubbleLeft,
  heroPhoto,
  heroVideoCamera,
  heroMusicalNote,
  heroCodeBracket,
  heroCog6Tooth,
  heroBolt,
  heroBars3
} from '@ng-icons/heroicons/outline';
import { HeadingComponent } from 'src/app/components/heading/heading.component';
import { UserAvatarComponent } from 'src/app/components/user-avatar/user-avatar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HeadingComponent,
    UserAvatarComponent,
    NgIconsModule.withIcons(
      {
        heroHome,
        heroChatBubbleLeft,
        heroPhoto,
        heroVideoCamera,
        heroMusicalNote,
        heroCodeBracket,
        heroCog6Tooth,
        heroBolt,
        heroBars3
      }),
  ]
})
export class DashboardModule { }
