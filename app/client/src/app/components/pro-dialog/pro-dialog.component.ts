import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroBolt,
} from '@ng-icons/heroicons/outline';
import { SubscriptionService } from 'src/app/service/subscription.service';

@Component({
  selector: 'app-pro-dialog',
  standalone: true,
  imports: [CommonModule, NgIconComponent
  ],
  providers: [provideIcons({heroBolt})],
  templateUrl: './pro-dialog.component.html',
  styleUrls: ['./pro-dialog.component.css']
})
export class ProDialogComponent {

  constructor(private SubscriptionService:SubscriptionService){}
  onUpgrade(){
    const userId = localStorage.getItem('userId')
    console.log(userId)
    this.SubscriptionService.getPaymentUrl(userId).subscribe((res)=>{
      window.location.href = res;
    })
  }
}
