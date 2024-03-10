import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();

  documentSelectedEvent = new EventEmitter<Document>();
  // documentChangedEvent = new EventEmitter<Document[]>();
  documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }


  getDocuments(): Document[]{
    this.http
      .get('https://ab-cms-5ee91-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        //success
        (documents: Document[])=>{
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => { //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
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
          let documentsListClone = this.documents.slice();
          this.documentListChangedEvent.next(documentsListClone);
        },

        //error
        // error => {
        //   this.error.next(error.message)
        // }
        
      );
      return this.documents.slice();
  }

  getDocument(id: string): Document{
    return this.documents.find((d) => d.id === id);
  }

  deleteDocument(document: Document){
    if (!document){
      return;
    }
    const pos =this.documents.indexOf(document);
    if (pos<0){
      return;
    }
    this.documents.splice(pos, 1);
    // this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document){
    if(!originalDocument || !newDocument){
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos<0){
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    // let documentListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentListClone);
    this.storeDocuments();
  }

  getMaxId(): number {
    let maxId = 0;

    for (let document of this.documents){
      let currentId = +document.id;
      if (currentId > maxId){
        maxId = currentId;
      }
    }

    return maxId;
  }

  addDocument(newDocument: Document){
    if(!newDocument){
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    // let documentsListClone = this.documents.slice();
    // this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
  }

  storeDocuments() {
    let arrayToText = JSON.parse(JSON.stringify(this.documents));
    this.http.put('https://ab-cms-5ee91-default-rtdb.firebaseio.com/documents.json', arrayToText, {headers: new HttpHeaders({'Content-Type': 'application/json'})})
      .subscribe(
        () => {
          let documentsListClone = this.documents.slice();
          this.documentListChangedEvent.next(documentsListClone);
        }
      )
  }
}
