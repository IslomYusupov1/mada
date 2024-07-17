import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentReqParamCreateComponent } from './government-req-param-create.component';

describe('GovernmentReqParamCreateComponent', () => {
  let component: GovernmentReqParamCreateComponent;
  let fixture: ComponentFixture<GovernmentReqParamCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernmentReqParamCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentReqParamCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
