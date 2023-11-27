
import { Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { navbarTrigger } from './navbar-animation';
import { HtmlParser } from '@angular/compiler';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [navbarTrigger]
})
export class NavbarComponent {

  scrollUp: boolean = true
  @Output() navLink = new EventEmitter<string>()

  dropDown: boolean = false
  windowHeight : number = 0

  openDropDown() {
    this.dropDown = !this.dropDown
  }

  onLinkClicks(event: Event) {
    const targetElement = event.target as HTMLElement
    this.navLink.emit(targetElement.innerHTML)
  }

  @HostListener('window:scroll',['$event'])
  onWindowScroll(){
    if(scrollY < this.windowHeight){
      this.scrollUp = true
    }else{
      this.dropDown = false
      this.scrollUp = false
    }
    this.windowHeight = window.scrollY
  }

}
