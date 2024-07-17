import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVipLimitsComponent } from './user-vip-limits.component';

describe('UserVipLimitsComponent', () => {
  let component: UserVipLimitsComponent;
  let fixture: ComponentFixture<UserVipLimitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserVipLimitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVipLimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
