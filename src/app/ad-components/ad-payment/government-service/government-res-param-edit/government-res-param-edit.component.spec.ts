import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentResParamEditComponent } from './government-res-param-edit.component';

describe('GovernmentResParamEditComponent', () => {
  let component: GovernmentResParamEditComponent;
  let fixture: ComponentFixture<GovernmentResParamEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernmentResParamEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentResParamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
