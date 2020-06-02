import {TestBed} from '@angular/core/testing';

import {TeamRoleService} from './team-role.service';

describe('TeamRoleService', () => {
  let service: TeamRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
