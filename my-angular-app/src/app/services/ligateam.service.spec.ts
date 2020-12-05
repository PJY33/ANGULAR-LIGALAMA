import { TestBed } from '@angular/core/testing';

import { LigateamService } from './ligateam.service';

describe('LigateamService', () => {
  let service: LigateamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigateamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
