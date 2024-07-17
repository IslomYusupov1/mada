import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperOperatorChatComponent } from './super-operator-chat.component';

describe('SuperOperatorChatComponent', () => {
  let component: SuperOperatorChatComponent;
  let fixture: ComponentFixture<SuperOperatorChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperOperatorChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperOperatorChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
