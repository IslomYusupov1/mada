import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoModelInfoLeftComponent } from './auto-model-info-left.component';

describe('AutoModelInfoLeftComponent', () => {
  let component: AutoModelInfoLeftComponent;
  let fixture: ComponentFixture<AutoModelInfoLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoModelInfoLeftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoModelInfoLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
