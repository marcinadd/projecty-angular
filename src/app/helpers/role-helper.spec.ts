import {TestBed} from '@angular/core/testing';

import {RoleHelper} from './role-helper';

describe('RoleHelper', () => {
  let service: RoleHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
