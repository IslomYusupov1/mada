import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTitleDialogComponent } from './category-title-dialog.component';

describe('CategoryTitleDialogComponent', () => {
  let component: CategoryTitleDialogComponent;
  let fixture: ComponentFixture<CategoryTitleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryTitleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTitleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
