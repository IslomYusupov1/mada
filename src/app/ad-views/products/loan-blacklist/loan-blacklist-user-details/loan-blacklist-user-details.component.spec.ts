import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanBlacklistUserDetailsComponent } from './loan-blacklist-user-details.component';

describe('LoanBlacklistUserDetailsComponent', () => {
  let component: LoanBlacklistUserDetailsComponent;
  let fixture: ComponentFixture<LoanBlacklistUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanBlacklistUserDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanBlacklistUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
