import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { VideoComponent } from './video.component';
import { HeadingComponent } from 'src/app/components/heading/heading.component';
import { FormsModule } from '@angular/forms';
import { UserAvatarComponent } from 'src/app/components/user-avatar/user-avatar.component';
import { MatModule } from 'src/app/shared/modules/mat.module';


@NgModule({
  declarations: [
    VideoComponent
  ],
  imports: [
    CommonModule,
    VideoRoutingModule,
    HeadingComponent,
    FormsModule,
    UserAvatarComponent,
    MatModule
  ]
})
export class VideoModule { }
