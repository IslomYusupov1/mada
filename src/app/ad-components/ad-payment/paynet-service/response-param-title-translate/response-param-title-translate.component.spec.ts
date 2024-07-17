import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseParamTitleTranslateComponent } from './response-param-title-translate.component';

describe('ResponseParamTitleTranslateComponent', () => {
  let component: ResponseParamTitleTranslateComponent;
  let fixture: ComponentFixture<ResponseParamTitleTranslateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseParamTitleTranslateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseParamTitleTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
