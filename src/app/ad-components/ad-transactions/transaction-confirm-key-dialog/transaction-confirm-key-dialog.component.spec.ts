import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionConfirmKeyDialogComponent } from './transaction-confirm-key-dialog.component';

describe('TransactionConfirmKeyDialogComponent', () => {
  let component: TransactionConfirmKeyDialogComponent;
  let fixture: ComponentFixture<TransactionConfirmKeyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionConfirmKeyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionConfirmKeyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
