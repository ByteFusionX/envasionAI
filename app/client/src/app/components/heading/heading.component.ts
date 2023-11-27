import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroHome,
  heroChatBubbleLeft,
  heroPhoto,
  heroVideoCamera,
  heroMusicalNote,
  heroCodeBracket,
  heroCog6Tooth,
  heroBolt,
  heroBars3,
  heroArrowSmallRight
} from '@ng-icons/heroicons/outline';
@Component({
  selector: 'app-heading',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ heroHome, heroChatBubbleLeft, heroPhoto, heroVideoCamera, heroMusicalNote, heroCodeBracket, heroCog6Tooth, heroBolt, heroBars3, heroArrowSmallRight })],
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() icon!: string;
}
