import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashbackRateHistoryComponent } from './cashback-rate-history.component';

describe('CashbackRateHistoryComponent', () => {
  let component: CashbackRateHistoryComponent;
  let fixture: ComponentFixture<CashbackRateHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashbackRateHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashbackRateHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
