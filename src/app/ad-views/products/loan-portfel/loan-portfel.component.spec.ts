import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanPortfelComponent } from './loan-portfel.component';

describe('LoanPortfelComponent', () => {
  let component: LoanPortfelComponent;
  let fixture: ComponentFixture<LoanPortfelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanPortfelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanPortfelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
