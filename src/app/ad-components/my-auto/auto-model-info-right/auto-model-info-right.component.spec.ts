import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoModelInfoRightComponent } from './auto-model-info-right.component';

describe('AutoModelInfoRightComponent', () => {
  let component: AutoModelInfoRightComponent;
  let fixture: ComponentFixture<AutoModelInfoRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoModelInfoRightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoModelInfoRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
