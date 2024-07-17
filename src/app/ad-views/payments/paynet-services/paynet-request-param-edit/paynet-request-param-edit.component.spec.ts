import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaynetRequestParamEditComponent } from './paynet-request-param-edit.component';

describe('PaynetRequestParamEditComponent', () => {
  let component: PaynetRequestParamEditComponent;
  let fixture: ComponentFixture<PaynetRequestParamEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaynetRequestParamEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaynetRequestParamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
