import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';


@Injectable({
  providedIn: 'root'
})

export class ContactService{
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxContactId: number;

  constructor(private http: HttpClient) { 
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[]{
    this.http
      .get('https://ab-cms-5ee91-default-rtdb.firebaseio.com/contacts.json')
      .subscribe(
        //success
        (contacts: Contact[])=>{
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => { //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB){
              return -1;
            }
            if (nameA > nameB){
              return 1;
            }

            return 0;
          });
          let contactsListClone = this.contacts.slice();
          this.contactListChangedEvent.next(contactsListClone);
        },
      );

    return this.contacts.slice();
  }
  
  getContact(id: string): Contact{
    return this.contacts.find((c) => c.id === id);
  }

  deleteContact(contact: Contact){
    if (!contact){
      return;
    }
    const pos =this.contacts.indexOf(contact);
    if (pos<0){
      return;
    }
    this.contacts.splice(pos, 1);
    // this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact){
    if(originalContact===null || originalContact===undefined || newContact===null || newContact===undefined){
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos<0){
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    // let contactListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactListClone);
    this.storeContacts();
  }

  getMaxId(): number {
    let maxId = 0;

    for (let contact of this.contacts){
      let currentId = +contact.id;
      if (currentId > maxId){
        maxId = currentId;
      }
    }

    return maxId;
  }

  addContact(newContact: Contact){
    if(!newContact){
      return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    // let contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
  }

  storeContacts() {
    let arrayToText = JSON.parse(JSON.stringify(this.contacts));
    this.http.put('https://ab-cms-5ee91-default-rtdb.firebaseio.com/contacts.json', arrayToText, {headers: new HttpHeaders({'Content-Type': 'application/json'})})
      .subscribe(
        () => {
          let contactsListClone = this.contacts.slice();
          this.contactListChangedEvent.next(contactsListClone);
        }
      )
  }
  
}
