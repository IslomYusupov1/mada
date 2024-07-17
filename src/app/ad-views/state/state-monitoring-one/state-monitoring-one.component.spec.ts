import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateMonitoringOneComponent } from './state-monitoring-one.component';

describe('StateMonitoringOneComponent', () => {
  let component: StateMonitoringOneComponent;
  let fixture: ComponentFixture<StateMonitoringOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateMonitoringOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateMonitoringOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
