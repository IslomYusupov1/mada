import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPortfelAdminStatisticsComponent } from './loan-portfel-admin-statistics.component';

describe('LoanPortfelAdminStatisticsComponent', () => {
  let component: LoanPortfelAdminStatisticsComponent;
  let fixture: ComponentFixture<LoanPortfelAdminStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanPortfelAdminStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanPortfelAdminStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
