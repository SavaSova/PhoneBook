import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhoneBookTableComponent } from './components/phone-book-table/phone-book-table.component';
import { NgbModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DeleteContactButtonComponent } from './components/delete-contact-button/delete-contact-button.component';
import { AddContactButtonComponent } from './components/add-contact-button/add-contact-button.component';
import { UpdateContactButtonComponent } from './components/update-contact-button/update-contact-button.component';
import { ContactService } from './services/contact.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactValidationService } from './services/contact-validation.service';

@NgModule({
  declarations: [
    AppComponent,
    PhoneBookTableComponent,
    DeleteContactButtonComponent,
    AddContactButtonComponent,
    UpdateContactButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    NgbModalModule,
    ReactiveFormsModule
  ],
  providers: [
    ContactService,
    ContactValidationService,
    NgbModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
