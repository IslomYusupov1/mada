import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositOpenCheckDialogComponent } from './deposit-open-check-dialog.component';

describe('DepositOpenCheckDialogComponent', () => {
  let component: DepositOpenCheckDialogComponent;
  let fixture: ComponentFixture<DepositOpenCheckDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositOpenCheckDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositOpenCheckDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
