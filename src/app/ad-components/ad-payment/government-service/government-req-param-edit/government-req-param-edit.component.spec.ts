import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentReqParamEditComponent } from './government-req-param-edit.component';

describe('GovernmentReqParamEditComponent', () => {
  let component: GovernmentReqParamEditComponent;
  let fixture: ComponentFixture<GovernmentReqParamEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernmentReqParamEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentReqParamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
