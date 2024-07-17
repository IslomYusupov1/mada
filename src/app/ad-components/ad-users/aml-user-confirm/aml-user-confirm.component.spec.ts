import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmlUserConfirmComponent } from './aml-user-confirm.component';

describe('AmlUserConfirmComponent', () => {
  let component: AmlUserConfirmComponent;
  let fixture: ComponentFixture<AmlUserConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmlUserConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmlUserConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
