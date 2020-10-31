import { Component } from '@angular/core';

export interface ChatMessage {
  message: string;
  fromAI: boolean;
}

@Component({
  selector: 'di-scenario-detail-chat',
  templateUrl: './scenario-detail-chat.component.html',
  styleUrls: ['./scenario-detail-chat.component.scss']
})
export class ScenarioDetailChatComponent {

  public chatMessages: ChatMessage[] = [
    {
      message: 'Test message',
      fromAI: false
    },
    {
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent efficitur libero eget ligula vulputate fringilla.',
      fromAI: true
    }
  ];
}
