import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostButtonComponent } from './post-button.component';

describe('PostButtonComponent', () => {
  let component: PostButtonComponent;
  let fixture: ComponentFixture<PostButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
