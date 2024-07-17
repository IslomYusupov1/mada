import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaynetReponseParamCreateComponent } from './paynet-reponse-param-create.component';

describe('PaynetReponseParamCreateComponent', () => {
  let component: PaynetReponseParamCreateComponent;
  let fixture: ComponentFixture<PaynetReponseParamCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaynetReponseParamCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaynetReponseParamCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
