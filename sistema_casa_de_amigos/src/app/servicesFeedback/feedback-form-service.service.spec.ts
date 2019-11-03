import { TestBed } from '@angular/core/testing';

import { FeedbackFormServiceService } from './feedback-form-service.service';

describe('FeedbackFormServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FeedbackFormServiceService = TestBed.get(FeedbackFormServiceService);
    expect(service).toBeTruthy();
  });
});
