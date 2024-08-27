import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from '../../services/contact.service';
import { ContactInterface } from '../../models/contact.interface';
import { ContactType } from '../../models/contact.type';
import { Observable, Subject } from 'rxjs';
import { ContactValidationService } from '../../services/contact-validation.service';

@Component({
  selector: 'app-update-contact-button',
  templateUrl: './update-contact-button.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './update-contact-button.component.css'
})

export class UpdateContactButtonComponent {

  @Input() contactId!: number;

  updatedContact: ContactInterface = {
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
    private contactService: ContactService,
    private modalService: NgbModal,
    public contactValidationService: ContactValidationService
  ) { }  

  openVerticallyCentered(content: TemplateRef<any>) {    
    this.contactService.getContactById(this.contactId).subscribe({
        next: (result: ContactInterface) => {          
            this.updatedContact = result;
            this.selectedType = this.updatedContact.contactType as ContactType;
            this.contactValidationService.updateValidators(this.updatedContact.contactType as ContactType);            
            const modalRef: NgbModalRef = this.modalService.open(content, { centered: true });                      
        },
        error: (error) => {          
          console.error(error);
        }
    });  
  }

  contactUpdatedSubject = new Subject<ContactInterface>();

  async saveUpdatedContact(): Promise<void> {
    const updatedContact: ContactInterface = await this.contactService.updateContact(this.updatedContact);
    this.contactUpdatedSubject.next(updatedContact);
  }

  setContactType(type: ContactType): void {
    this.selectedType = type;
    this.updatedContact.contactType = type;
    this.contactValidationService.updateValidators(type);
  }
}

