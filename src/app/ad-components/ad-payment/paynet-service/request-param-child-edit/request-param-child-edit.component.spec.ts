import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestParamChildEditComponent } from './request-param-child-edit.component';

describe('RequestParamChildEditComponent', () => {
  let component: RequestParamChildEditComponent;
  let fixture: ComponentFixture<RequestParamChildEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestParamChildEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestParamChildEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
