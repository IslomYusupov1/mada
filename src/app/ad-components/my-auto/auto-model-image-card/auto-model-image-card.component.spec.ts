import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoModelImageCardComponent } from './auto-model-image-card.component';

describe('AutoModelImageCardComponent', () => {
  let component: AutoModelImageCardComponent;
  let fixture: ComponentFixture<AutoModelImageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoModelImageCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoModelImageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
