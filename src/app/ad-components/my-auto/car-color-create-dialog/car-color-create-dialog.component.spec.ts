import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarColorCreateDialogComponent } from './car-color-create-dialog.component';

describe('CarColorCreateDialogComponent', () => {
  let component: CarColorCreateDialogComponent;
  let fixture: ComponentFixture<CarColorCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarColorCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarColorCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
