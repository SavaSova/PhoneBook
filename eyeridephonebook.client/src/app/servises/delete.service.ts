import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  private currentContactId: number | null = null;
  private contactDeletedSubject = new Subject<number>();

  constructor(private http: HttpClient) { }

  setCurrentContactId(id: number): void {
    this.currentContactId = id;
  }

  deleteCurrentContact(): Promise<any> {
    if (this.currentContactId !== null) {
      const apiUrl = `https://localhost:7164/api/Contacts/${this.currentContactId}`;
      return this.http.delete(apiUrl).toPromise()
        .then(() => {
          this.contactDeletedSubject.next(this.currentContactId!);
        });
    }
    return Promise.reject('No current contact ID set.');
  }

  get contactDeleted$() {
    return this.contactDeletedSubject.asObservable();
  }
}
