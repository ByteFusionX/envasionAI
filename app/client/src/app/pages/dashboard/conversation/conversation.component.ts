import { Component } from '@angular/core';
import { OpenAiService } from 'src/app/service/openAi.service';
import { SubscriptionService } from 'src/app/service/subscription.service';
import { conversationBody } from 'src/app/shared/models/conversationBody.interface';
import { Conversationmessages } from 'src/app/shared/models/messages.interface';
import {
  MatDialog,
} from '@angular/material/dialog';
import { ProDialogComponent } from 'src/app/components/pro-dialog/pro-dialog.component';
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent {
  isLoading: boolean = false;
  message!: string;
  messages: Conversationmessages[] = [];

  constructor(private openAiService: OpenAiService, private subscriptionService: SubscriptionService, public dialog: MatDialog) { }
  ngOnInit() {

  }

  onSubmit() {
    if (this.isLoading === false && this.message) {
      const userId = localStorage.getItem("userId");
      const userMessage = { role: "user", content: this.message };
      this.messages.push(userMessage);
      this.message = ''
      this.isLoading = true;

      this.openAiService.sendMessage(this.messages).subscribe((res: Conversationmessages) => {
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
