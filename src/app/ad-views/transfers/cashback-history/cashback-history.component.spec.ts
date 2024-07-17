import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashbackHistoryComponent } from './cashback-history.component';

describe('CashbackHistoryComponent', () => {
  let component: CashbackHistoryComponent;
  let fixture: ComponentFixture<CashbackHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashbackHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashbackHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
