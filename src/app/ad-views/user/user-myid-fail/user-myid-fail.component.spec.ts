import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMyidFailComponent } from './user-myid-fail.component';

describe('UserMyidFailComponent', () => {
  let component: UserMyidFailComponent;
  let fixture: ComponentFixture<UserMyidFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMyidFailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMyidFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
