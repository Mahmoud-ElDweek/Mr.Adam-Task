import { TestBed } from '@angular/core/testing';

import { GetOneUserService } from './get-one-user.service';

describe('GetOneUserService', () => {
  let service: GetOneUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetOneUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
