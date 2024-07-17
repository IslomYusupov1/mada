import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoModelEditDialogComponent } from './auto-model-edit-dialog.component';

describe('AutoModelEditDialogComponent', () => {
  let component: AutoModelEditDialogComponent;
  let fixture: ComponentFixture<AutoModelEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoModelEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoModelEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
