import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestParamTitleTranslateComponent } from './request-param-title-translate.component';

describe('RequestParamTitleTranslateComponent', () => {
  let component: RequestParamTitleTranslateComponent;
  let fixture: ComponentFixture<RequestParamTitleTranslateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestParamTitleTranslateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestParamTitleTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
