import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLoanAppProcessComponent } from './product-loan-app-process.component';

describe('ProductLoanAppProcessComponent', () => {
  let component: ProductLoanAppProcessComponent;
  let fixture: ComponentFixture<ProductLoanAppProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductLoanAppProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLoanAppProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
