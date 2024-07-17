import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCriticalNotificationComponent } from './edit-critical-notification.component';

describe('EditCriticalNotificationComponent', () => {
  let component: EditCriticalNotificationComponent;
  let fixture: ComponentFixture<EditCriticalNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCriticalNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCriticalNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
