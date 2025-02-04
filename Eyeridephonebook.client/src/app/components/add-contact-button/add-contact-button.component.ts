import { Component, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactType } from '../../models/contact.type';
import { ContactInterface } from '../../models/contact.interface';
import { ContactValidationService } from '../../services/contact-validation.service';

@Component({
  selector: 'app-add-contact-button',
  templateUrl: './add-contact-button.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './add-contact-button.component.css'
})
export class AddContactButtonComponent {  
  selectedType: ContactType = 'Person';

  newContact: ContactInterface = {    
    id: 0,
    contactType: 'Person',
    name: '',
    phoneNumber: '',
    textComments: '',
    fieldOfActivity: '',
    tin: '',
    industry: '',
    ein: ''
  };  

  constructor(
    private contactService: ContactService,
    private modalService: NgbModal,
    public contactValidationService: ContactValidationService
  ) {    
    this.contactValidationService.selectedType$.subscribe(type => {
      this.selectedType = type;
      this.newContact.contactType = type;
    });
  }   

  onAddContactClick() {
    this.contactService.addContact(this.newContact).subscribe(
      (createdContact) => {
        console.log('Contact added successfully:', createdContact);
        this.contactService.notifyContactUpdated(createdContact);
      },
      (error) => {
        console.error('Error adding contact:', error);        
      }
    );
  }

  openModal(content: TemplateRef<any>) {
    const modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

    modalRef.result.then(
      (result) => {
        console.log('The modal window is closed. Result:', result);        
        if (result === 'Save click') {
          this.onAddContactClick();
        }
      },
      (reason) => { 
        this.contactValidationService.cleanFields();       
        console.log('The modal window was closed without saving. Reason:', reason);
      }
    );
  }

  setContactType(type: ContactType): void {
    this.selectedType = type;
    this.newContact.contactType = type;
    this.contactValidationService.updateValidators(type);
  }
}
