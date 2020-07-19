import {TestBed} from '@angular/core/testing';

import {RoleNotificationService} from './role-notification.service';

describe('RoleNotificationService', () => {
  let service: RoleNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
