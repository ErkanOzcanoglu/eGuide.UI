import { Component } from '@angular/core';

@Component({
  selector: 'app-live-support',
  templateUrl: './live-support.component.html',
  styleUrls: ['./live-support.component.css'],
})
export class LiveSupportComponent {

  isChatboxOpen = false;
  messages: { text: string; isUser: boolean }[] = [];
  userMessage = '';

  toggleChatbox() {
    this.isChatboxOpen = !this.isChatboxOpen;
  }

  sendMessage() {
    if (this.userMessage.trim() !== '') {
      this.addUserMessage(this.userMessage);
      this.respondToUser(this.userMessage);
      this.userMessage = '';
    }
  }

  addUserMessage(message: string) {
    this.messages.push({ text: message, isUser: true });
  }

  addBotMessage(message: string) {
    this.messages.push({ text: message, isUser: false });
  }

  respondToUser(userMessage: string) {
    // Replace this with your chatbot logic
    setTimeout(() => {
      this.addBotMessage('This is a response from the chatbot.');
    }, 500);
  }
}
