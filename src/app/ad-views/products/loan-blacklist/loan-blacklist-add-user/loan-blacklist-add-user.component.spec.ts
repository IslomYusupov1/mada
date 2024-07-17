import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanBlacklistAddUserComponent } from './loan-blacklist-add-user.component';

describe('LoanBlacklistAddUserComponent', () => {
  let component: LoanBlacklistAddUserComponent;
  let fixture: ComponentFixture<LoanBlacklistAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanBlacklistAddUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanBlacklistAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
