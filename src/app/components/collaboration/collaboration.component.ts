import { Component, OnDestroy, OnInit } from '@angular/core';
import { CollaborationMessage } from '../../models/collaborationMessage';
import { CollaborationService } from '../../services/collaboration/collaboration.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collaboration',
  imports: [FormsModule, CommonModule],
  templateUrl: './collaboration.component.html',
  styleUrl: './collaboration.component.css'
})
export class CollaborationComponent implements OnInit, OnDestroy {

  messages: CollaborationMessage[] = [];
  storyId = '123';
  userId = 'itsvp';
  newMessage = '';

  constructor(
    private collaborationService: CollaborationService,
    private route: ActivatedRoute
  ) {
    this.storyId = this.route.snapshot.paramMap.get('storyId')!;
    this.collaborationService.connect(this.storyId);
  }

  ngOnInit(): void {
    // Connect to the WebSocket when the component loads
    this.collaborationService.connect(this.storyId);

    // Listen for incoming messages
    this.collaborationService.onMessage().subscribe((msg) => {
      this.messages.push(msg);
    });
  }

  ngOnDestroy(): void {
    // Disconnect the WebSocket when the component is destroyed
    this.collaborationService.disconnect();
  }
  
  sendMessage(): void {
    if (this.newMessage.trim()) {
      const message: CollaborationMessage = {
        storyId: this.storyId,
        content: this.newMessage,
        userId: this.userId,
        type: 'edit',
      };

      this.collaborationService.sendMessage(message);
      this.newMessage = '';
    }
  }

}
