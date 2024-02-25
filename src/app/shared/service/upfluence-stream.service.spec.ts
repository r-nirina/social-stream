import { TestBed } from '@angular/core/testing';

import { UpfluenceStreamService } from './upfluence-stream.service';

describe('UpfluenceStreamService', () => {
  let service: UpfluenceStreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpfluenceStreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
