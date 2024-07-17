import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateMonitoringComponent } from './state-monitoring.component';

describe('StateMonitoringComponent', () => {
  let component: StateMonitoringComponent;
  let fixture: ComponentFixture<StateMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateMonitoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
