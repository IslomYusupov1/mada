import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentServiceCreateComponent } from './government-service-create.component';

describe('GovernmentServiceCreateComponent', () => {
  let component: GovernmentServiceCreateComponent;
  let fixture: ComponentFixture<GovernmentServiceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernmentServiceCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentServiceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
