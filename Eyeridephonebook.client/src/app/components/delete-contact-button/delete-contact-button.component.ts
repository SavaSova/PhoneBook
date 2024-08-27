import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-delete-contact-button',
  templateUrl: './delete-contact-button.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './delete-contact-button.component.css'
})
export class DeleteContactButtonComponent { 

  @Input() contactId!: number;

  constructor(
    private contactService: ContactService,
    public modalService: NgbModal
    ) { }

  deleteContact(): void {
    this.contactService.setCurrentContactId(this.contactId);
    this.contactService.deleteCurrentContact().then(
      () => {
        console.log(`Contact with ID ${this.contactId} deleted successfully.`);
      },
      (error) => {
        console.error('Error deleting contact:', error);
      }
    );
  }

  openVerticallyCentered(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}
}
