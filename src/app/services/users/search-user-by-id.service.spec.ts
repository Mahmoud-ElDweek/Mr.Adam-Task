import { TestBed } from '@angular/core/testing';

import { SearchUserByIdService } from './search-user-by-id.service';

describe('SearchUserByIdService', () => {
  let service: SearchUserByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchUserByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
