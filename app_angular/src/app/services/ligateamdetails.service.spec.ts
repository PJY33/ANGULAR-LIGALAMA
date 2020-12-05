import { TestBed } from '@angular/core/testing';

import { LigateamdetailsService } from './ligateamdetails.service';

describe('LigateamdetailsService', () => {
  let service: LigateamdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigateamdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
