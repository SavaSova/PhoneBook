import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ContactInterface } from '../models/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {  
  private apiUrl = 'https://localhost:7164/api/Contacts';

  constructor(private http: HttpClient) { }

  //add contact  
  private contactUpdatedSubject = new Subject<ContactInterface>();

  addContact(contact: ContactInterface): Observable<ContactInterface> {
    return this.http.post<ContactInterface>(this.apiUrl, contact);
  }  

  //delete contact
  private currentContactId: number | null = null;
  private contactDeletedSubject = new Subject<number>(); 

  setCurrentContactId(id: number): void {
    this.currentContactId = id;
  }

  deleteCurrentContact(): Promise<any> {
    if (this.currentContactId !== null) {      
      return this.http.delete(`${this.apiUrl}/${this.currentContactId}`).toPromise()
        .then(() => {
          this.contactDeletedSubject.next(this.currentContactId!);
        });
    }
    return Promise.reject('No current contact ID set.');
  }  

  //update contact
  async updateContact(updatedContact: Partial<ContactInterface>): Promise<any> {
    try {
      const response = await this.http.put(`${this.apiUrl}/${updatedContact.id}`, updatedContact).toPromise();
      console.log('Contact added successfully');
      this.updateCurrentContactData(updatedContact);
      
      return response;
    } catch (error) {
      console.error('Error adding a contact:', error);
      throw error;
    }
  }
  
  getContactById(contactId: number): Observable<ContactInterface> {
    return this.http.get<ContactInterface>(`${this.apiUrl}/${contactId}`);
  }  

  public updatedContactSubject = new Subject<any>();

  updateCurrentContactData(updatedContact: any) {    
    console.log('Updating data in PutService:', updatedContact);
    this.contactUpdatedSubject.next(updatedContact);
  }

  // get contacts
  getPhoneBookData(): Observable<ContactInterface[]> {
    return this.http.get<ContactInterface[]>(`${this.apiUrl}`);
  }

  //
  notifyContactDeleted(contactId: number) {
    this.contactDeletedSubject.next(contactId);
  }

  notifyContactUpdated(contact: ContactInterface) {
    this.contactUpdatedSubject.next(contact);
  }

  get contactDeleted$() {
    return this.contactDeletedSubject.asObservable();
  }

  get contactUpdated$() {
    return this.contactUpdatedSubject.asObservable();
  }  
}
