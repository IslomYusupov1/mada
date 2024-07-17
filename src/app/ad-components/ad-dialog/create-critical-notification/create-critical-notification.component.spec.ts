import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCriticalNotificationComponent } from './create-critical-notification.component';

describe('CreateCriticalNotificationComponent', () => {
  let component: CreateCriticalNotificationComponent;
  let fixture: ComponentFixture<CreateCriticalNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCriticalNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCriticalNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
