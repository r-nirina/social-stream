import { TestBed } from '@angular/core/testing';

import { StatsStore } from './stats.store';

describe('StatsStoreService', () => {
  let service: StatsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
