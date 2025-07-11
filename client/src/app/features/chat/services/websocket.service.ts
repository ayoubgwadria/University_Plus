import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Client, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient!: Client
  public messages: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {
    this.connect();
  }

  connect() {
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8082/ws-chat',
      webSocketFactory: () => new SockJS('http://localhost:8082/ws-chat'),
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log('Connected');
        this.stompClient.subscribe('/topic/public', (message) => {
          this.messages.next(JSON.parse(message.body));
        });
      }
    });

    this.stompClient.activate();
  }

  sendMessage(msg: any) {
    this.stompClient.publish({
      destination: '/app/chat.send',
      body: JSON.stringify(msg)
    });
  }
}