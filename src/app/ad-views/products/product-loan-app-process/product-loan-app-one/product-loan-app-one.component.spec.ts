import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLoanAppOneComponent } from './product-loan-app-one.component';

describe('ProductLoanAppOneComponent', () => {
  let component: ProductLoanAppOneComponent;
  let fixture: ComponentFixture<ProductLoanAppOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductLoanAppOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLoanAppOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
