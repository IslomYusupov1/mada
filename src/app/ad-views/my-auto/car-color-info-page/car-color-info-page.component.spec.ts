import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarColorInfoPageComponent } from './car-color-info-page.component';

describe('CarColorInfoPageComponent', () => {
  let component: CarColorInfoPageComponent;
  let fixture: ComponentFixture<CarColorInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarColorInfoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarColorInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
