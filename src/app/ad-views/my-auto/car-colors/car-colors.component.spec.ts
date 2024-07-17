import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarColorsComponent } from './car-colors.component';

describe('CarColorsComponent', () => {
  let component: CarColorsComponent;
  let fixture: ComponentFixture<CarColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarColorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
