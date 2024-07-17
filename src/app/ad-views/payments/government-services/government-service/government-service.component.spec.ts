import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentServiceComponent } from './government-service.component';

describe('GovernmentServiceComponent', () => {
  let component: GovernmentServiceComponent;
  let fixture: ComponentFixture<GovernmentServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernmentServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
