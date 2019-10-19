import { TestBed } from '@angular/core/testing';

import { SitioSeguidoServiceService } from './sitio-seguido-service.service';

describe('SitioSeguidoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SitioSeguidoServiceService = TestBed.get(SitioSeguidoServiceService);
    expect(service).toBeTruthy();
  });
});
