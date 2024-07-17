import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentTitleDialogComponent } from './government-title-dialog.component';

describe('GovernmentTitleDialogComponent', () => {
  let component: GovernmentTitleDialogComponent;
  let fixture: ComponentFixture<GovernmentTitleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernmentTitleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentTitleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
