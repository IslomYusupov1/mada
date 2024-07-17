import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestParamChildCreateComponent } from './request-param-child-create.component';

describe('RequestParamChildCreateComponent', () => {
  let component: RequestParamChildCreateComponent;
  let fixture: ComponentFixture<RequestParamChildCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestParamChildCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestParamChildCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
