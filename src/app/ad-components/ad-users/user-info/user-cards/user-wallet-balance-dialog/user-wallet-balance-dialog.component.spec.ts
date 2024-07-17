import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWalletBalanceDialogComponent } from './user-wallet-balance-dialog.component';

describe('UserWalletBalanceDialogComponent', () => {
  let component: UserWalletBalanceDialogComponent;
  let fixture: ComponentFixture<UserWalletBalanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWalletBalanceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWalletBalanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
