import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  private messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) { 
    this.messages = MOCKMESSAGES;
  }

  compareNumbers(a, b){
    return a-b;
  }

  getMessages(): Message[]{
    this.http
      .get('https://ab-cms-5ee91-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        //success
        (messages: Message[])=>{
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messages.sort(this.compareNumbers);
          let messagesListClone = this.messages.slice();
          this.messageChangedEvent.next(messagesListClone);
        }
      );
    return this.messages.slice();
  }
  
  getMessage(id: string): Message{
    return this.messages.find((m) => m.id === id);
  }

  addMessage(message: Message){
    this.messages.push(message);
    // this.messageChangedEvent.emit(this.messages.slice());
    this.storeMessages();
  }

  getMaxId(): number{
    let maxId = 0;

    for(let message of this.messages){
      let currentId = +message.id;
      if (currentId > maxId){
        maxId = currentId;
      }
    }

    return maxId;
  }

  storeMessages() {
    let arrayToText = JSON.parse(JSON.stringify(this.messages));
    this.http.put('https://ab-cms-5ee91-default-rtdb.firebaseio.com/messages.json', arrayToText, {headers: new HttpHeaders({'Content-Type': 'application/json'})})
      .subscribe(
        () => {
          let messagesListClone = this.messages.slice();
          this.messageChangedEvent.next(messagesListClone);
        }
      )
  }
  
}
