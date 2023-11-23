import { Component, ElementRef, HostListener } from '@angular/core';
import { SubscriptionService } from 'src/app/service/subscription.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {

  showSidebar = false;
  freeLimit :number = 0;
  percentageStyle:string = 'width: 0%'
  constructor(private elementRef: ElementRef, private subscriptionService:SubscriptionService) {}

  ngOnInit(){
    const userId = localStorage.getItem('userId')

    this.subscriptionService.freeLimit$.subscribe((res: number) => {
      this.freeLimit = res;
      this.calculatePercentage(this.freeLimit)
    });

    this.subscriptionService.getLimit(userId).subscribe((res:number)=>{
      this.freeLimit = res;
      this.calculatePercentage(this.freeLimit)
    })
  }
  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showSidebar = false;
    }
  }

  calculatePercentage(limit:number){
    const percentage = limit / 5 * 100
    this.percentageStyle = `width: ${percentage}%`
  }
}
