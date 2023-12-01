import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeRoutingModule } from './code-routing.module';
import { CodeComponent } from './code.component';
import { HeadingComponent } from 'src/app/components/heading/heading.component';
import { FormsModule } from '@angular/forms';
import { UserAvatarComponent } from 'src/app/components/user-avatar/user-avatar.component';
import { MatModule } from 'src/app/shared/modules/mat.module';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [
    CodeComponent
  ],
  imports: [
    CommonModule,
    CodeRoutingModule,
    HeadingComponent,
    FormsModule,
    UserAvatarComponent,
    MatModule,
    MarkdownModule.forChild(),
    MarkdownModule.forRoot({ loader: HttpClient })
    
  ],
  providers:[
    provideMarkdown({ loader: HttpClient }),
    

  ]
})
export class CodeModule { }
