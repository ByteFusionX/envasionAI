import { ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  windowHeight : number = 0

  constructor(private _scroller: ViewportScroller) { }

  onClickLink(value: string) {
    const tagValue = value
    console.log(tagValue);
    
    this._scroller.scrollToAnchor(tagValue)
  }
}
