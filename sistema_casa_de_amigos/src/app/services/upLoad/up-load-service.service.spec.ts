import { TestBed } from '@angular/core/testing';

import { UpLoadServiceService } from './up-load-service.service';

describe('UpLoadServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpLoadServiceService = TestBed.get(UpLoadServiceService);
    expect(service).toBeTruthy();
  });
});
