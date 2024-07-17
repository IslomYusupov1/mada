import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaynetCategoryCreateComponent } from './paynet-category-create.component';

describe('PaynetCategoryCreateComponent', () => {
  let component: PaynetCategoryCreateComponent;
  let fixture: ComponentFixture<PaynetCategoryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaynetCategoryCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaynetCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
