import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelInfoPageComponent } from './model-info-page.component';

describe('ModelInfoPageComponent', () => {
  let component: ModelInfoPageComponent;
  let fixture: ComponentFixture<ModelInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelInfoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
