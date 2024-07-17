import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachPhotoDialogComponent } from './attach-photo-dialog.component';

describe('AttachPhotoDialogComponent', () => {
  let component: AttachPhotoDialogComponent;
  let fixture: ComponentFixture<AttachPhotoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachPhotoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachPhotoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
