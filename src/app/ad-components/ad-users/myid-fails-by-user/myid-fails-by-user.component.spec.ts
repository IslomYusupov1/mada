import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyidFailsByUserComponent } from './myid-fails-by-user.component';

describe('MyidFailsByUserComponent', () => {
  let component: MyidFailsByUserComponent;
  let fixture: ComponentFixture<MyidFailsByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyidFailsByUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyidFailsByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
