import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserClientInfoComponent } from './user-client-info.component';

describe('UserClientInfoComponent', () => {
  let component: UserClientInfoComponent;
  let fixture: ComponentFixture<UserClientInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserClientInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserClientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
