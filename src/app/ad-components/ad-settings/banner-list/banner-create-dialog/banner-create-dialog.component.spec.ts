import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCreateDialogComponent } from './banner-create-dialog.component';

describe('BannerCreateDialogComponent', () => {
  let component: BannerCreateDialogComponent;
  let fixture: ComponentFixture<BannerCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerCreateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
