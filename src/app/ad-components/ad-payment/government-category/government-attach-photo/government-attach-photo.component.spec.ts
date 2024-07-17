import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentAttachPhotoComponent } from './government-attach-photo.component';

describe('GovernmentAttachPhotoComponent', () => {
  let component: GovernmentAttachPhotoComponent;
  let fixture: ComponentFixture<GovernmentAttachPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovernmentAttachPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernmentAttachPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
