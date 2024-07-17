import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarColorSimilarAddDialogComponent } from './car-color-similar-add-dialog.component';

describe('CarColorSimilarAddDialogComponent', () => {
  let component: CarColorSimilarAddDialogComponent;
  let fixture: ComponentFixture<CarColorSimilarAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarColorSimilarAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarColorSimilarAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
