import {TestBed} from '@angular/core/testing';
import {DateHelper} from './date-helper';

describe('DateHelper', () => {
  let service: DateHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
