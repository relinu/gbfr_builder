import { TestBed } from '@angular/core/testing';

import { MasterTraitService } from './master-trait-service';

describe('MasteryTraitService', () => {
  let service: MasterTraitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterTraitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});