import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBannerCollectionDialogComponent } from './edit-banner-collection-dialog.component';

describe('EditBannerCollectionDialogComponent', () => {
  let component: EditBannerCollectionDialogComponent;
  let fixture: ComponentFixture<EditBannerCollectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBannerCollectionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBannerCollectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
