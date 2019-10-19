import { TestBed } from '@angular/core/testing';

import { CalificacionesServiceService } from './calificaciones-service.service';

describe('CalificacionesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalificacionesServiceService = TestBed.get(CalificacionesServiceService);
    expect(service).toBeTruthy();
  });
});
