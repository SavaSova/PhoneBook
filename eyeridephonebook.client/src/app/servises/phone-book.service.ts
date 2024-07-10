import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhoneBookInterface } from '../interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhoneBookService {

  constructor(private http: HttpClient) { }

  getPhoneBookData(): Observable<PhoneBookInterface[]> {
    const apiUrl = 'https://localhost:7164/api/Contacts';
    return this.http.get<PhoneBookInterface[]>(apiUrl);
  }
}
