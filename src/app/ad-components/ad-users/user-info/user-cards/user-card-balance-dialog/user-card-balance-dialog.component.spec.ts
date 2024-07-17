import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardBalanceDialogComponent } from './user-card-balance-dialog.component';

describe('UserCardBalanceDialogComponent', () => {
  let component: UserCardBalanceDialogComponent;
  let fixture: ComponentFixture<UserCardBalanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCardBalanceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCardBalanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
