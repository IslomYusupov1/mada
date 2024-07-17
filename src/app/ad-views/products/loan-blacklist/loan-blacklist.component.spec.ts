import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanBlacklistComponent } from './loan-blacklist.component';

describe('LoanBlacklistComponent', () => {
  let component: LoanBlacklistComponent;
  let fixture: ComponentFixture<LoanBlacklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanBlacklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanBlacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
