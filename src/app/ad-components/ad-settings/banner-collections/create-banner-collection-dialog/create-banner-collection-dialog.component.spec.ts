import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBannerCollectionDialogComponent } from './create-banner-collection-dialog.component';

describe('CreateBannerCollectionDialogComponent', () => {
  let component: CreateBannerCollectionDialogComponent;
  let fixture: ComponentFixture<CreateBannerCollectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBannerCollectionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBannerCollectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
