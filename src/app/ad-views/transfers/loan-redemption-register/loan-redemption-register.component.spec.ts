import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRedemptionRegisterComponent } from './loan-redemption-register.component';

describe('LoanRedemptionRegisterComponent', () => {
  let component: LoanRedemptionRegisterComponent;
  let fixture: ComponentFixture<LoanRedemptionRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanRedemptionRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanRedemptionRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
