import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCheckHoldComponent } from './transaction-check-hold.component';

describe('TransactionCheckHoldComponent', () => {
  let component: TransactionCheckHoldComponent;
  let fixture: ComponentFixture<TransactionCheckHoldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionCheckHoldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionCheckHoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
