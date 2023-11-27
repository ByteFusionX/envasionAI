import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {

  windowHeight: number = 0
  textShow: boolean = true
  timeInterval!: any
  headings: string[] = ['Photo Generation.', 'Music Generation.', 'Video Generation.', 'Code Generation.','Chatbot.']
  heading: String = this.headings[0]

  constructor(private _scroller: ViewportScroller) { }

  ngOnInit(): void {
    this.showHeadings(0)
  }

  showHeadings(index: number) {
    if (this.textShow === true) {
      if (index == this.headings.length) index = 0
      this.heading = this.headings[index++]
    }
    setTimeout(() => {
      this.textShow = !this.textShow
      this.showHeadings(index)
    }, 3000)
  }

  ngOnDestroy(): void {
    clearInterval(this.timeInterval)
  }

  onClickLink(value: string) {
    const tagValue = value
    this._scroller.scrollToAnchor(tagValue)
  }
}
