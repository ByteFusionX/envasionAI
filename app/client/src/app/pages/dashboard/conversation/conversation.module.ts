import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConversationRoutingModule } from './conversation-routing.module';
import { ConversationComponent } from './conversation.component';
import { HeadingComponent } from 'src/app/components/heading/heading.component';
import { OpenAiService } from 'src/app/service/openAi.service';
import { FormsModule } from '@angular/forms'
import { UserAvatarComponent } from 'src/app/components/user-avatar/user-avatar.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatModule } from 'src/app/shared/modules/mat.module';


@NgModule({
  declarations: [
    ConversationComponent
  ],
  imports: [
    CommonModule,
    ConversationRoutingModule,
    HeadingComponent,
    FormsModule,
    UserAvatarComponent,
    MatModule
  ],
  providers:[OpenAiService]
})
export class ConversationModule { }
