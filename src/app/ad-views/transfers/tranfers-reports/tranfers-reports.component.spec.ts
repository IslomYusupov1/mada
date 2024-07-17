import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranfersReportsComponent } from './tranfers-reports.component';

describe('TranfersReportsComponent', () => {
  let component: TranfersReportsComponent;
  let fixture: ComponentFixture<TranfersReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranfersReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranfersReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
