import { TestBed } from '@angular/core/testing';

import { SuperOperatorChatService } from './super-operator-chat.service';

describe('SuperOperatorChatService', () => {
  let service: SuperOperatorChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperOperatorChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
