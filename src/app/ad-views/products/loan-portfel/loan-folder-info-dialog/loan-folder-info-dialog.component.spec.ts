import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanFolderInfoDialogComponent } from './loan-folder-info-dialog.component';

describe('LoanFolderInfoDialogComponent', () => {
  let component: LoanFolderInfoDialogComponent;
  let fixture: ComponentFixture<LoanFolderInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanFolderInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanFolderInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
