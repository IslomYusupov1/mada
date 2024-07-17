import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerContentEditComponent } from './banner-content-edit.component';

describe('BannerContentEditComponent', () => {
  let component: BannerContentEditComponent;
  let fixture: ComponentFixture<BannerContentEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerContentEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerContentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
