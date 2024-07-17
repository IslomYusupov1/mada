import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedCardsComponent } from './ordered-cards.component';

describe('OrderedCardsComponent', () => {
  let component: OrderedCardsComponent;
  let fixture: ComponentFixture<OrderedCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderedCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
