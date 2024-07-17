import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarColorInfoLeftComponent } from './car-color-info-left.component';

describe('CarColorInfoLeftComponent', () => {
  let component: CarColorInfoLeftComponent;
  let fixture: ComponentFixture<CarColorInfoLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarColorInfoLeftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarColorInfoLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
