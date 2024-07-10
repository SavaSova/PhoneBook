import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneBookTableComponent } from './phone-book-table.component';

describe('PhoneBookTableComponent', () => {
  let component: PhoneBookTableComponent;
  let fixture: ComponentFixture<PhoneBookTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhoneBookTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PhoneBookTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
