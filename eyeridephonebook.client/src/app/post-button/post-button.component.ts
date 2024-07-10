import { Component, TemplateRef, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../servises/post.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { PhoneBookInterface } from '../interfaces';
import { ContactType } from '../types';

@Component({
  selector: 'app-post-button',
  templateUrl: './post-button.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './post-button.component.css'
})
export class PostButtonComponent {

  newContact: PhoneBookInterface = {
    
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

  selectedType: ContactType = 'Person';

  constructor(
    private http: HttpClient,
    private postService: PostService,
    private modalService: NgbModal
  ) { }

  postContact() {
    const apiUrl = 'https://localhost:7164/api/Contacts';

    this.http.post<PhoneBookInterface>(apiUrl, this.newContact).subscribe(
      (createdContact) => {
        
        console.log('Contact added successfully:', createdContact);
        this.postService.updateData(createdContact);
                
      },
      (error) => {
        console.error('Error adding a contact:', error);        
      }
    );
  }

  onAddContactClick() {
    this.postContact();
  }

  openModal(content: TemplateRef<any>) {
    const modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  
    modalRef.result.then(
      (result) => {
        console.log('The modal window is closed. Result:', result);        
        if (result === 'Save click') {
          this.postContact();
        }
      },
      (reason) => {        
        console.log('The modal window was closed without saving. Reason:', reason);
      }
    );
  }

  setContactType(type: ContactType): void {
    this.selectedType = type;
    this.newContact.contactType = type;
  }
}
