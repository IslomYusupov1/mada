import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoModelCreateDialogComponent } from './auto-model-create-dialog.component';

describe('AutoModelCreateDialogComponent', () => {
  let component: AutoModelCreateDialogComponent;
  let fixture: ComponentFixture<AutoModelCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoModelCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoModelCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
