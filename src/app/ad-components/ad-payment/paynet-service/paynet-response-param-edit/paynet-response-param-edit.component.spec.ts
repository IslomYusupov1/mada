import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaynetResponseParamEditComponent } from './paynet-response-param-edit.component';

describe('PaynetResponseParamEditComponent', () => {
  let component: PaynetResponseParamEditComponent;
  let fixture: ComponentFixture<PaynetResponseParamEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaynetResponseParamEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaynetResponseParamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
