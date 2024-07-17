import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCollectionsComponent } from './banner-collections.component';

describe('BannerCollectionsComponent', () => {
  let component: BannerCollectionsComponent;
  let fixture: ComponentFixture<BannerCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerCollectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
