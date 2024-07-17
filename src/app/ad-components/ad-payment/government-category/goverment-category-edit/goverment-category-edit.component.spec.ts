import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovermentCategoryEditComponent } from './goverment-category-edit.component';

describe('GovermentCategoryEditComponent', () => {
  let component: GovermentCategoryEditComponent;
  let fixture: ComponentFixture<GovermentCategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovermentCategoryEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovermentCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
