import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateStatisticsCardComponent } from './state-statistics-card.component';

describe('StateStatisticsCardComponent', () => {
  let component: StateStatisticsCardComponent;
  let fixture: ComponentFixture<StateStatisticsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateStatisticsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateStatisticsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
