import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhoneBookTableComponent } from './phone-book-table/phone-book-table.component';
import { PhoneBookService } from './servises/phone-book.service';
import { NgbModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { PostButtonComponent } from './post-button/post-button.component';
import { PutButtonComponent } from './put-button/put-button.component';
import { PostService } from './servises/post.service';
import { PutService } from './servises/put.service';
import { DeleteService } from './servises/delete.service';

@NgModule({
  declarations: [
    AppComponent,
    PhoneBookTableComponent,
    DeleteButtonComponent,
    PostButtonComponent,
    PutButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    NgbModalModule
  ],
  providers: [
    PhoneBookService,
    PostService,
    PutService,
    DeleteService,
    NgbModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
