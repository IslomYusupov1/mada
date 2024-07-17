import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentCategoriesComponent } from './government-categories.component';

describe('GovernmentCategoriesComponent', () => {
  let component: GovernmentCategoriesComponent;
  let fixture: ComponentFixture<GovernmentCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernmentCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
