import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent implements OnInit{
  document: Document;
  id: string;

  constructor(private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute){}

  ngOnInit(): void {
      this.route.params
        .subscribe(
          (params: Params) => {
            this.id = params['id'];
            this.document = this.documentService.getDocument(this.id);
          }
        );
  }
}
