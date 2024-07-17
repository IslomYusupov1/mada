import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaynetCategoriesChildComponent } from './paynet-categories-child.component';

describe('PaynetCategoriesChildComponent', () => {
  let component: PaynetCategoriesChildComponent;
  let fixture: ComponentFixture<PaynetCategoriesChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaynetCategoriesChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaynetCategoriesChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
