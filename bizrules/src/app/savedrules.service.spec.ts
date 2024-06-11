import { TestBed } from '@angular/core/testing';

import { SavedrulesService } from './savedrules.service';

describe('SavedrulesService', () => {
  let service: SavedrulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedrulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
