import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmlUserOneComponent } from './aml-user-one.component';

describe('AmlUserOneComponent', () => {
  let component: AmlUserOneComponent;
  let fixture: ComponentFixture<AmlUserOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmlUserOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmlUserOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
