import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ContactType } from '../models/contact.type';

@Injectable({
  providedIn: 'root'
})
export class ContactValidationService {

  private selectedTypeSubject = new BehaviorSubject<ContactType>('Person');
  selectedType$ = this.selectedTypeSubject.asObservable();

  constructor() {  }

  phoneNumberPattern = /^\+?\d{5,15}$/;

  contactValidation = new FormGroup({
    name: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [
      Validators.required, 
      Validators.pattern(this.phoneNumberPattern),
      Validators.minLength(5),
      Validators.maxLength(15)
    ]),
    textComments: new FormControl(''),
    fieldOfActivity: new FormControl(''),
    tin:new FormControl(''),
    industry: new FormControl(''),
    ein: new FormControl('')
  });

  isFieldInvalid(fieldName: string): boolean {
    const fieldControl = this.contactValidation.get(fieldName);
    return !!fieldControl?.invalid && fieldControl?.touched;
  }
  
  public updateValidators(contactType: ContactType) {
    this.selectedTypeSubject.next(contactType);

    this.contactValidation.get('fieldOfActivity')?.clearValidators();
    this.contactValidation.get('tin')?.clearValidators();
    this.contactValidation.get('industry')?.clearValidators();
    this.contactValidation.get('ein')?.clearValidators();

    this.contactValidation.get('fieldOfActivity')?.setValue('');
    this.contactValidation.get('tin')?.setValue('');
    this.contactValidation.get('industry')?.setValue('');
    this.contactValidation.get('ein')?.setValue('');

    switch (contactType) {
      case 'Person':
        break;
      case 'Public':
        this.contactValidation.get('fieldOfActivity')?.setValidators(Validators.required);
        this.contactValidation.get('tin')?.setValidators(Validators.required);
        break;
      case 'Private':
        this.contactValidation.get('industry')?.setValidators(Validators.required);
        this.contactValidation.get('ein')?.setValidators(Validators.required);
        break;
    }

    this.contactValidation.get('fieldOfActivity')?.updateValueAndValidity();
    this.contactValidation.get('tin')?.updateValueAndValidity();
    this.contactValidation.get('industry')?.updateValueAndValidity();
    this.contactValidation.get('ein')?.updateValueAndValidity();
  }  

  public getSelectedType(): ContactType {
    return this.selectedTypeSubject.getValue();
  }

  public cleanFields(): void {
    this.contactValidation.get('name')?.setValue('');
    this.contactValidation.get('phoneNumber')?.setValue('');
    this.contactValidation.get('textComments')?.setValue('');
    this.contactValidation.get('fieldOfActivity')?.setValue('');
    this.contactValidation.get('tin')?.setValue('');
    this.contactValidation.get('industry')?.setValue('');
    this.contactValidation.get('ein')?.setValue('');
  }
}
