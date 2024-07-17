import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaynetCategoryEditComponent } from './paynet-category-edit.component';

describe('PaynetCategoryEditComponent', () => {
  let component: PaynetCategoryEditComponent;
  let fixture: ComponentFixture<PaynetCategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaynetCategoryEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaynetCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
