import { TestBed } from '@angular/core/testing';

import { RespuestasServiceService } from './respuestas-service.service';

describe('RespuestasServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RespuestasServiceService = TestBed.get(RespuestasServiceService);
    expect(service).toBeTruthy();
  });
});
