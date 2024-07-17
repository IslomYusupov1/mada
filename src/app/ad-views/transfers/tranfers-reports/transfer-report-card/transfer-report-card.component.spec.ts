import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferReportCardComponent } from './transfer-report-card.component';

describe('TransferReportCardComponent', () => {
  let component: TransferReportCardComponent;
  let fixture: ComponentFixture<TransferReportCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferReportCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
