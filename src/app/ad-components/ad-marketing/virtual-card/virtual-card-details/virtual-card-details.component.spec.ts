import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualCardDetailsComponent } from './virtual-card-details.component';

describe('VirtualCardDetailsComponent', () => {
  let component: VirtualCardDetailsComponent;
  let fixture: ComponentFixture<VirtualCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualCardDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
