import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentUpdateAppDialogComponent } from './document-update-app-dialog.component';

describe('DocumentUpdateAppDialogComponent', () => {
  let component: DocumentUpdateAppDialogComponent;
  let fixture: ComponentFixture<DocumentUpdateAppDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentUpdateAppDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentUpdateAppDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
