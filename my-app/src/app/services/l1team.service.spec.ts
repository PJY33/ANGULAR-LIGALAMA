import { TestBed } from '@angular/core/testing';

import { L1teamService } from './l1team.service';

describe('L1teamService', () => {
  let service: L1teamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(L1teamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
