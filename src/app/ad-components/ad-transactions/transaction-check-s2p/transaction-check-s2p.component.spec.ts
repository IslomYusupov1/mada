import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCheckS2pComponent } from './transaction-check-s2p.component';

describe('TransactionCheckS2pComponent', () => {
  let component: TransactionCheckS2pComponent;
  let fixture: ComponentFixture<TransactionCheckS2pComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionCheckS2pComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionCheckS2pComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
