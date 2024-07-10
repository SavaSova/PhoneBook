import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public dataSubject = new Subject<any>();

  updateData(data: any) {    
    console.log('Updating data in PostService:', data);
    this.dataSubject.next(45);
  }

  getData() {
    console.log('getData fun');
    return this.dataSubject.asObservable();  
  }
}
