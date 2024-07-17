import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaynetRequestParamsCreateComponent } from './paynet-request-params-create.component';

describe('PaynetRequestParamsCreateComponent', () => {
  let component: PaynetRequestParamsCreateComponent;
  let fixture: ComponentFixture<PaynetRequestParamsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaynetRequestParamsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaynetRequestParamsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
