import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitDetailsComponent } from './limit-details.component';

describe('LimitDetailsComponent', () => {
  let component: LimitDetailsComponent;
  let fixture: ComponentFixture<LimitDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
