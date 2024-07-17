import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaynetServiceEditComponent } from './paynet-service-edit.component';

describe('PaynetServiceEditComponent', () => {
  let component: PaynetServiceEditComponent;
  let fixture: ComponentFixture<PaynetServiceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaynetServiceEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaynetServiceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
