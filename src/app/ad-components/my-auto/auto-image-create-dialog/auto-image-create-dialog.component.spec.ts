import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoImageCreateDialogComponent } from './auto-image-create-dialog.component';

describe('AutoImageCreateDialogComponent', () => {
  let component: AutoImageCreateDialogComponent;
  let fixture: ComponentFixture<AutoImageCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoImageCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoImageCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
