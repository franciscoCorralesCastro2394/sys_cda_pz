import { TestBed } from '@angular/core/testing';

import { SitioServiceService } from './sitio-service.service';

describe('SitioServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SitioServiceService = TestBed.get(SitioServiceService);
    expect(service).toBeTruthy();
  });
});
