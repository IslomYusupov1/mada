import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentUpdateApplicationComponent } from './document-update-application.component';

describe('DocumentUpdateApplicationComponent', () => {
  let component: DocumentUpdateApplicationComponent;
  let fixture: ComponentFixture<DocumentUpdateApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentUpdateApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentUpdateApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
