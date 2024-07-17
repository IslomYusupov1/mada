import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovermentCategoryCreateComponent } from './goverment-category-create.component';

describe('GovermentCategoryCreateComponent', () => {
  let component: GovermentCategoryCreateComponent;
  let fixture: ComponentFixture<GovermentCategoryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovermentCategoryCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovermentCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
