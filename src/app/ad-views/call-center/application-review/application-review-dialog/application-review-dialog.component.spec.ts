import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationReviewDialogComponent } from './application-review-dialog.component';

describe('ApplicationReviewDialogComponent', () => {
  let component: ApplicationReviewDialogComponent;
  let fixture: ComponentFixture<ApplicationReviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationReviewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
