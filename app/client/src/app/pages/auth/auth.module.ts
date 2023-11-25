import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { MatModule } from 'src/app/shared/modules/mat.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserHttpInterceptor } from 'src/app/interceptor/http.interceptor';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UserHttpInterceptor, multi: true }
  ]
})
export class AuthModule { }
