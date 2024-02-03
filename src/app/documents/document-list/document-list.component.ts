import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter();

  documents: Document[] = [
    new Document('1', 'Address Book', 'Contains the addresses of people I know', '-----'),
    new Document('2', 'Doctor Appointments', 'Contains the doctor appointments I have scheduled in the next month', '----'),
    new Document('3', 'Birtdays', 'Contains a list of birthdays of the people I know', 'a;sldf;'),
    new Document('4', 'Reminders', 'Holds a list of reminders I have need for the next 6 months', 'asf;lj')
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
