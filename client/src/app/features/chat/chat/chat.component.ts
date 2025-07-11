import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../services/websocket.service';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  message = '';
  chatMessages: any[] = [];
  sender = 'Ayoub'; // Replace with real user data

  constructor(private wsService: WebSocketService) {}

  ngOnInit(): void {
    this.wsService.messages.subscribe(msg => {
      if (msg) {
        this.chatMessages.push(msg);
      }
    });
  }

  send() {
    if (this.message.trim() === '') return;

    const chatMessage = {
      sender: this.sender,
      content: this.message,
      type: 'CHAT'
    };

    this.wsService.sendMessage(chatMessage);
    this.message = '';
  }
}
