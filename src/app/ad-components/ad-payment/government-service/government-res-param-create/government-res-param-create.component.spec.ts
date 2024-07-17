import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentResParamCreateComponent } from './government-res-param-create.component';

describe('GovernmentResParamCreateComponent', () => {
  let component: GovernmentResParamCreateComponent;
  let fixture: ComponentFixture<GovernmentResParamCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernmentResParamCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentResParamCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
