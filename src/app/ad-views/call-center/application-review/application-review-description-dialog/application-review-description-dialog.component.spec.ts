import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationReviewDescriptionDialogComponent } from './application-review-description-dialog.component';

describe('ApplicationReviewDescriptionDialogComponent', () => {
  let component: ApplicationReviewDescriptionDialogComponent;
  let fixture: ComponentFixture<ApplicationReviewDescriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationReviewDescriptionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationReviewDescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
