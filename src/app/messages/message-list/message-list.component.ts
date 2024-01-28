import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [
    new Message('2', 'Grades', 'When will the grades for this assignment be posted?', 'Steve'),
    new Message('3', 'Grades Posted', 'The grades for this assignment will be posted tomorrow at 8am.', 'Bro. Jackson'),
    new Message('4', 'Thanks!', 'Thank you Brother Jackson!', 'Steve')
  ]

  onAddMessage(message: Message){
    this.messages.push(message);
  }
}
