import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalTransferInfoComponent } from './international-transfer-info.component';

describe('InternationalTransferInfoComponent', () => {
  let component: InternationalTransferInfoComponent;
  let fixture: ComponentFixture<InternationalTransferInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternationalTransferInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalTransferInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
