import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentUpdateAppCompareDialogComponent } from './document-update-app-compare-dialog.component';

describe('DocumentUpdateAppCompareDialogComponent', () => {
  let component: DocumentUpdateAppCompareDialogComponent;
  let fixture: ComponentFixture<DocumentUpdateAppCompareDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentUpdateAppCompareDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentUpdateAppCompareDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
