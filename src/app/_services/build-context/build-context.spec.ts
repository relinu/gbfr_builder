import { TestBed } from '@angular/core/testing';

import { BuildContext } from './build-context';

describe('BuildContext', () => {
  let service: BuildContext;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildContext);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
