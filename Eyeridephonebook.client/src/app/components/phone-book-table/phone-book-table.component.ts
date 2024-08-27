import { Component, OnInit } from '@angular/core';
import { ContactInterface } from '../../models/contact.interface';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-phone-book-table',
  templateUrl: './phone-book-table.component.html',
  styleUrls: ['./phone-book-table.component.css']
})
export class PhoneBookTableComponent implements OnInit {   
  
  contacts: ContactInterface[] = [];
  filteredPhoneBook: ContactInterface[] = [];
  
  showPerson: boolean = true;
  showPublic: boolean = true;
  showPrivate: boolean = true;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.getContacts();
    this.subscribeToServiceEvents();
  }

  getContacts() {
    this.contactService.getPhoneBookData().subscribe({
      next: (result: ContactInterface[]) => {
        this.contacts = result;
        this.filterContacts();
      },
      error: (error) => {
        console.error('Error fetching contacts:', error);
      }
    });
  }

  private subscribeToServiceEvents() {
    this.contactService.contactDeleted$.subscribe(deletedId => {
      this.contacts = this.contacts.filter(contact => contact.id !== deletedId);
      this.filterContacts();      
    });

    this.contactService.contactUpdated$.subscribe(updatedContact => {
      const index = this.contacts.findIndex(contact => contact.id === updatedContact.id);
      if (index !== -1) {
        this.contacts[index] = { ...this.contacts[index], ...updatedContact };
      } else {
        this.contacts.push(updatedContact);
      }
      this.filterContacts(); 
    });
  }

  filterContacts() {
    this.filteredPhoneBook = this.contacts.filter(contact => 
      (this.showPerson && contact.contactType === 'Person') ||
      (this.showPublic && contact.contactType === 'Public') ||
      (this.showPrivate && contact.contactType === 'Private')
    );
  }
}
