import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaynetServiceCreateComponent } from './paynet-service-create.component';

describe('PaynetServiceCreateComponent', () => {
  let component: PaynetServiceCreateComponent;
  let fixture: ComponentFixture<PaynetServiceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaynetServiceCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaynetServiceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
