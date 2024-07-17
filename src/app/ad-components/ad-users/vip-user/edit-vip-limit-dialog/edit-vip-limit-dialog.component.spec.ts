import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVipLimitDialogComponent } from './edit-vip-limit-dialog.component';

describe('EditVipLimitDialogComponent', () => {
  let component: EditVipLimitDialogComponent;
  let fixture: ComponentFixture<EditVipLimitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVipLimitDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVipLimitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
