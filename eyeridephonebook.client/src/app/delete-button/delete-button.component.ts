import { Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteService } from '../servises/delete.service';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './delete-button.component.css'
})
export class DeleteButtonComponent { 

  @Input() contactId!: number;

  constructor(
    private deleteService: DeleteService,
    public modalService: NgbModal
    ) { }

  deleteContact(): void {
    this.deleteService.setCurrentContactId(this.contactId);
    this.deleteService.deleteCurrentContact().then(
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
