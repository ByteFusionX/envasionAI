import { Component, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {

  showSidebar = false;
  constructor(private elementRef: ElementRef) {}
  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showSidebar = false;
    }
  }
}
