import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserClientsStatusComponent } from './user-clients-status.component';

describe('UserClientsStatusComponent', () => {
  let component: UserClientsStatusComponent;
  let fixture: ComponentFixture<UserClientsStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserClientsStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserClientsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
