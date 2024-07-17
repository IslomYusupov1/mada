import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVipLimitDialogComponent } from './create-vip-limit-dialog.component';

describe('CreateVipLimitDialogComponent', () => {
  let component: CreateVipLimitDialogComponent;
  let fixture: ComponentFixture<CreateVipLimitDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateVipLimitDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVipLimitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
