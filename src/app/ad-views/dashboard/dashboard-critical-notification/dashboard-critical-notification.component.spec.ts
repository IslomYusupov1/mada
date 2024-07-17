import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCriticalNotificationComponent } from './dashboard-critical-notification.component';

describe('DashboardCriticalNotificationComponent', () => {
  let component: DashboardCriticalNotificationComponent;
  let fixture: ComponentFixture<DashboardCriticalNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCriticalNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCriticalNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
