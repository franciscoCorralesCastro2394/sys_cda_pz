import { TestBed } from '@angular/core/testing';

import { NoticiaServiceService } from './noticia-service.service';

describe('NoticiaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoticiaServiceService = TestBed.get(NoticiaServiceService);
    expect(service).toBeTruthy();
  });
});
