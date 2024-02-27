import { TestBed } from '@angular/core/testing';

import { PostsStore } from './posts.store';

describe('PostsStoreService', () => {
  let service: PostsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
