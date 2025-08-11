import { TestBed } from '@angular/core/testing';

import { Loginregservice } from './loginregservice';

describe('Loginregservice', () => {
  let service: Loginregservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Loginregservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
