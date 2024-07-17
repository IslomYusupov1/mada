import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarColorInfoRightComponent } from './car-color-info-right.component';

describe('CarColorInfoRightComponent', () => {
  let component: CarColorInfoRightComponent;
  let fixture: ComponentFixture<CarColorInfoRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarColorInfoRightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarColorInfoRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
