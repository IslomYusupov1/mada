import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentServiceEditComponent } from './government-service-edit.component';

describe('GovernmentServiceEditComponent', () => {
  let component: GovernmentServiceEditComponent;
  let fixture: ComponentFixture<GovernmentServiceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernmentServiceEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentServiceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
