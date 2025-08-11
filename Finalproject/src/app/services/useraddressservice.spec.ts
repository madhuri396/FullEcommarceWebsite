import { TestBed } from '@angular/core/testing';

import { Useraddressservice } from './useraddressservice';

describe('Useraddressservice', () => {
  let service: Useraddressservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Useraddressservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
