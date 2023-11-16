import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
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
  heroBars3,
  heroArrowSmallRight
} from '@ng-icons/heroicons/outline';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
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
        heroBars3,
        heroArrowSmallRight
      }),
  ]
})
export class HomeModule { }
