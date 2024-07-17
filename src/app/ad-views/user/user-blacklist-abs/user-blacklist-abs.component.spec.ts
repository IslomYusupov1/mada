import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBlacklistAbsComponent } from './user-blacklist-abs.component';

describe('UserBlacklistAbsComponent', () => {
  let component: UserBlacklistAbsComponent;
  let fixture: ComponentFixture<UserBlacklistAbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBlacklistAbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBlacklistAbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
