import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroBolt,
} from '@ng-icons/heroicons/outline';

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

}
