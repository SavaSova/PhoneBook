import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PutService } from '../servises/put.service';
import { PhoneBookInterface } from '../interfaces';
import { ContactType } from '../types';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-put-button',
  templateUrl: './put-button.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './put-button.component.css'
})

export class PutButtonComponent {

  @Input() contactId!: number;

  updatedContact: PhoneBookInterface = {
    id: 0,
    contactType: '',
    name: '',
    phoneNumber: '',
    textComments: '',
    fieldOfActivity: '',
    tin: '',
    industry: '',
    ein: ''
  };

  selectedType: ContactType = 'Person';

  constructor(    
    private putService: PutService,
    private modalService: NgbModal
  ) { }

  openVerticallyCentered(content: TemplateRef<any>) {    
    this.putService.getContactById(this.contactId).subscribe({
        next: (result: PhoneBookInterface) => {          
            this.updatedContact = result;
            const modalRef: NgbModalRef = this.modalService.open(content, { centered: true });                      
        },
        error: (error) => {          
          console.error(error);
        }
    });
  
  }

  contactUpdatedSubject = new Subject<PhoneBookInterface>();

  async saveUpdatedContact(): Promise<void> {
    const updatedContact: PhoneBookInterface = await this.putService.putCurrentContact(this.updatedContact);
    this.contactUpdatedSubject.next(updatedContact);
  }

  setContactType(type: ContactType): void {
    this.selectedType = type;
    this.updatedContact.contactType = type;
  }
}

