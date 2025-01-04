import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { CollaborationMessage } from '../../models/collaborationMessage';
import { Observable, Subject } from 'rxjs';
import { env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollaborationService {
  private wsSubject: WebSocketSubject<CollaborationMessage> | null = null;
  private messageSubject = new Subject<CollaborationMessage>();

  constructor() { }

  connect(storyId: string): void {
    const wsUrl = `wss://${env.apiDomain}/ws/collaborate/${storyId}`;
    this.wsSubject = webSocket<CollaborationMessage>(wsUrl);

    // listen to incoming messages
    this.wsSubject.subscribe({
      next: (message) => this.messageSubject.next(message),
      error: (error) => console.error("websocket error:", error),
      complete: () => console.log("websocket connection closed"),
    });
  }

  // disconnect websocket
  disconnect(): void {
    if(this.wsSubject) {
      this.wsSubject.complete();
      this.wsSubject = null;
    }
  }

  // Send a message
  sendMessage(message: CollaborationMessage): void {
    if (this.wsSubject) {
      this.wsSubject.next(message);
    } else {
      console.error('WebSocket is not connected.');
    }
  }

  // Observable to subscribe to incoming messages
  onMessage(): Observable<CollaborationMessage> {
    return this.messageSubject.asObservable();
  }
}
