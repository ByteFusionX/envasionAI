import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProDialogComponent } from 'src/app/components/pro-dialog/pro-dialog.component';
import { replicateService } from 'src/app/service/replicate.service';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { Conversationmessages } from 'src/app/shared/models/messages.interface';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {
  isLoading: boolean = false;
  message!: string;
  messages: Conversationmessages[] = [];

  constructor( private subscriptionService: SubscriptionService, public dialog: MatDialog,private replicate : replicateService) { }
  ngOnInit() {

  }

  onSubmit() {
    if (this.isLoading === false && this.message) {
      const userId = localStorage.getItem("userId");
      const userMessage = { role: "user", content: this.message };
      this.messages.push(userMessage);
      this.message = ''
      this.isLoading = true;

      this.replicate.vedioGenarator(this.messages).subscribe((res: Conversationmessages) => {
        console.log(res)
        this.messages.push(res)
        this.isLoading = false;
        this.subscriptionService.getLimit(userId).subscribe((res: number) => {
          this.subscriptionService.updateFreeLimit(res);
        })

      }, (error) => {
        console.log(error)
        if (error?.status === 403) {
          this.messages.pop()
          this.isLoading = false;
          this.dialog.open(ProDialogComponent);
        } else {
          // toast.error("Something went wrong.");
        }
      })
    }
  }
}
