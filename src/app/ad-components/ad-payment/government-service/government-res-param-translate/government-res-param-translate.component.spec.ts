import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentResParamTranslateComponent } from './government-res-param-translate.component';

describe('GovernmentResParamTranslateComponent', () => {
  let component: GovernmentResParamTranslateComponent;
  let fixture: ComponentFixture<GovernmentResParamTranslateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernmentResParamTranslateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentResParamTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
