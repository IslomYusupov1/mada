import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoImageEditDialogComponent } from './auto-image-edit-dialog.component';

describe('AutoImageEditDialogComponent', () => {
  let component: AutoImageEditDialogComponent;
  let fixture: ComponentFixture<AutoImageEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoImageEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoImageEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
