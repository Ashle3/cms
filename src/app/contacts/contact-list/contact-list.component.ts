import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit, OnDestroy{
  contacts: Contact[] = [];
  subscription: Subscription;
  term: string;

  constructor(private contactService: ContactService){}


  ngOnInit(){
      this.contacts = this.contactService.getContacts();
      this.subscription = this.contactService.contactListChangedEvent.subscribe(
        (contactList: Contact[]) => {
          this.contacts = contactList;
        }
      );
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  search(value: string){
    this.term = value;
  }
}