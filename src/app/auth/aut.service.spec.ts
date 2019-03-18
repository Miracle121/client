import { TestBed } from '@angular/core/testing';

import { AutService } from './aut.service';

describe('AutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutService = TestBed.get(AutService);
    expect(service).toBeTruthy();
  });
});
