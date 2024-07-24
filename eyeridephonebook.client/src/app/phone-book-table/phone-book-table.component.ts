import { Component, OnInit } from '@angular/core';
import { PhoneBookInterface } from '../interfaces';
import { PhoneBookService } from '../servises/phone-book.service';
import { DeleteService } from '../servises/delete.service';
import { PostService } from '../servises/post.service';
import { PutService } from '../servises/put.service';

@Component({
  selector: 'app-phone-book-table',
  templateUrl: './phone-book-table.component.html',
  styleUrl: './phone-book-table.component.css'
})
export class PhoneBookTableComponent implements OnInit {   
  
  phoneBook: PhoneBookInterface[] = [];
  
  constructor(
    private phoneBookService: PhoneBookService,
    private deleteService: DeleteService,
    private postService: PostService,
    private putService: PutService
    
    ) { }

  ngOnInit() {
    this.getPhoneBook();
    this.subscribeToDeleteEvent();   
    this.subscribeToPostService();
    this.subscribeToUpdateEvent();
  }

  getPhoneBook() {
    this.phoneBookService.getPhoneBookData().subscribe({
      next: (result: PhoneBookInterface[]) => {
        this.phoneBook = result;
        this.filterContacts();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  // checkbox
  filteredPhoneBook: PhoneBookInterface[] = [];

  showPerson: boolean = true;
  showPublic: boolean = true;
  showPrivate: boolean = true;

  filterContacts() {
    
    const filteredContacts = [];
    
    for (const contact of this.phoneBook) {      
      if ((this.showPerson && contact.contactType === 'Person') ||
        (this.showPublic && contact.contactType === 'Public') ||
        (this.showPrivate && contact.contactType === 'Private')) {
        filteredContacts.push(contact);
      }
    }
    this.filteredPhoneBook = filteredContacts;
  }

  // delete
  private subscribeToDeleteEvent() {
    this.deleteService.contactDeleted$.subscribe(deletedId => {
      this.phoneBook = this.phoneBook.filter(contact => contact.id !== deletedId);
      this.filterContacts();      
    });
  }

  // post
  private subscribeToPostService() {
    this.postService.dataSubject.subscribe((data) => {      
      if (data) {        
        this.phoneBook.push(data);
        this.getPhoneBook(); 
      }      
    });
  }
  
  private subscribeToUpdateEvent() {
    this.putService.contactUpdated$.subscribe((updatedContact) => {
      console.log('Updated contact:', updatedContact);
      if (updatedContact) {             
        const index = this.phoneBook.findIndex(contact => contact.id === updatedContact.id);
        if (index !== -1) {
          this.phoneBook[index] = updatedContact;
        }
        this.getPhoneBook();
      } 
    });
  }
}
