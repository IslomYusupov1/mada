import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerContentCreateComponent } from './banner-content-create.component';

describe('BannerContentCreateComponent', () => {
  let component: BannerContentCreateComponent;
  let fixture: ComponentFixture<BannerContentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerContentCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerContentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
