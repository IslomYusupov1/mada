import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanBlacklistUserEditComponent } from './loan-blacklist-user-edit.component';

describe('LoanBlacklistUserEditComponent', () => {
  let component: LoanBlacklistUserEditComponent;
  let fixture: ComponentFixture<LoanBlacklistUserEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanBlacklistUserEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanBlacklistUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
