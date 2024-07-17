import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarColorEditDialogComponent } from './car-color-edit-dialog.component';

describe('CarColorEditDialogComponent', () => {
  let component: CarColorEditDialogComponent;
  let fixture: ComponentFixture<CarColorEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarColorEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarColorEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
