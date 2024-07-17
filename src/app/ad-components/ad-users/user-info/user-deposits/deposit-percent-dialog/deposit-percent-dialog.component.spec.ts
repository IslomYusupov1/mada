import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositPercentDialogComponent } from './deposit-percent-dialog.component';

describe('DepositPercentDialogComponent', () => {
  let component: DepositPercentDialogComponent;
  let fixture: ComponentFixture<DepositPercentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositPercentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositPercentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
