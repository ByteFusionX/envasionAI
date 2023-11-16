import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path:'',
        loadChildren: () =>
        import('./home/home.module').then(
          (m) => m.HomeModule
        )
      },
      {
        path:'conversations',
        loadChildren: () =>
        import('./conversation/conversation.module').then(
          (m) => m.ConversationModule
        )
      },
      {
        path:'image',
        loadChildren: () =>
        import('./image/image.module').then(
          (m) => m.ImageModule
        )
      },
      {
        path:'video',
        loadChildren: () =>
        import('./video/video.module').then(
          (m) => m.VideoModule
        )
      },
      {
        path:'music',
        loadChildren: () =>
        import('./music/music.module').then(
          (m) => m.MusicModule
        )
      },
      {
        path:'code',
        loadChildren: () =>
        import('./code/code.module').then(
          (m) => m.CodeModule
        )
      },
      {
        path:'settings',
        loadChildren: () =>
        import('./settings/settings.module').then(
          (m) => m.SettingsModule
        )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
