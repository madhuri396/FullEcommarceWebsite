import { TestBed } from '@angular/core/testing';

import { Cartstateservice } from './cartstateservice';

describe('Cartstateservice', () => {
  let service: Cartstateservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cartstateservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
