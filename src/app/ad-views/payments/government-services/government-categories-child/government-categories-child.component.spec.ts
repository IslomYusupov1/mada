import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentCategoriesChildComponent } from './government-categories-child.component';

describe('GovernmentCategoriesChildComponent', () => {
  let component: GovernmentCategoriesChildComponent;
  let fixture: ComponentFixture<GovernmentCategoriesChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernmentCategoriesChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentCategoriesChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
