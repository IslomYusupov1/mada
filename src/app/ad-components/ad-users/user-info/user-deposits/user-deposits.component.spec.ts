import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDepositsComponent } from './user-deposits.component';

describe('UserDepositsComponent', () => {
  let component: UserDepositsComponent;
  let fixture: ComponentFixture<UserDepositsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDepositsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDepositsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
