import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentServiceInfoEditComponent } from './government-service-info-edit.component';

describe('GovernmentServiceInfoEditComponent', () => {
  let component: GovernmentServiceInfoEditComponent;
  let fixture: ComponentFixture<GovernmentServiceInfoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernmentServiceInfoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentServiceInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
