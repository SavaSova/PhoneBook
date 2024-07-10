import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PhoneBookInterface } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PutService {

  private contactUpdatedSubject = new Subject<PhoneBookInterface>();

  constructor(private http: HttpClient) { }

  async putCurrentContact(updatedContact: Partial<PhoneBookInterface>): Promise<any> {
    const apiUrl = `https://localhost:7164/api/Contacts/${updatedContact.id}`;
    try {
      const response = await this.http.put(apiUrl, updatedContact).toPromise();
      console.log('Contact added successfully');
      this.updateData(updatedContact);
      
      return response;
    } catch (error) {
      console.error('Error adding a contact:', error);
      throw error;
    }
  }
  
  getContactById(contactId: number): Observable<PhoneBookInterface> {
    const apiUrl = `https://localhost:7164/api/Contacts/${contactId}`;
    return this.http.get<PhoneBookInterface>(apiUrl);
  }

  get contactUpdated$() {
    return this.contactUpdatedSubject.asObservable();
  }

  public updatedContactSubject = new Subject<any>();

  updateData(updatedContact: any) {    
    console.log('Updating data in PutService:', updatedContact);
    this.contactUpdatedSubject.next(updatedContact);
  }
}
