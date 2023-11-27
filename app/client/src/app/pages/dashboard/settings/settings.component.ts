import { Component } from '@angular/core';
import { SubscriptionService } from 'src/app/service/subscription.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  isPro : boolean = false;
  constructor(private subscriptionService:SubscriptionService){}

  ngOnInit(){
    this.subscriptionService.checkSubscriptiohn().subscribe((res)=>{
      this.isPro = res;
    })
  }

  onSubscription(){
    const userId = localStorage.getItem('userId')
    this.subscriptionService.getPaymentUrl(userId).subscribe((res)=>{
      window.location.href = res;
    })
  }

}
