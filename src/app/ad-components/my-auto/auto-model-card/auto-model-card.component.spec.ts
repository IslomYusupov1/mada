import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoModelCardComponent } from './auto-model-card.component';

describe('AutoModelCardComponent', () => {
  let component: AutoModelCardComponent;
  let fixture: ComponentFixture<AutoModelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoModelCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoModelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
