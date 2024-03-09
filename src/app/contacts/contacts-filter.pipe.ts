import { Pipe, PipeTransform } from '@angular/core';

import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): any {
    //INSTRUCTIONS EXAMPLE
    let resultsArray: Contact[] =[];  
    if (term && term.length > 0) {
      resultsArray = contacts.filter(
         (contact:Contact) => contact.name.toLowerCase().includes(term.toLowerCase())
      );
   }
    if (resultsArray.length < 1){
      return contacts;
   }
    return resultsArray;

    //MY SOLUTION
    // const resultsArray = [];

    // for(const contact of contacts){
    //   if(contact.name === term){
    //     resultsArray.push(contact);
    //   }
    // }

    // if(resultsArray.length === 0){
    //   return contacts;
    // }

    // return resultsArray;
  }

}
