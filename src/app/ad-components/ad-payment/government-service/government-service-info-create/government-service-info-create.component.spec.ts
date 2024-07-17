import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentServiceInfoCreateComponent } from './government-service-info-create.component';

describe('GovernmentServiceInfoCreateComponent', () => {
  let component: GovernmentServiceInfoCreateComponent;
  let fixture: ComponentFixture<GovernmentServiceInfoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernmentServiceInfoCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentServiceInfoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
