import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConfirmationComponent } from './list-confirmation.component';

describe('ListConfirmationComponent', () => {
  let component: ListConfirmationComponent;
  let fixture: ComponentFixture<ListConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
