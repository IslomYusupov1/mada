import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentReqParamTranslateComponent } from './government-req-param-translate.component';

describe('GovernmentReqParamTranslateComponent', () => {
  let component: GovernmentReqParamTranslateComponent;
  let fixture: ComponentFixture<GovernmentReqParamTranslateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernmentReqParamTranslateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentReqParamTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
