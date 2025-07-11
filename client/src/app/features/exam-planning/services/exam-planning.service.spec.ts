import { TestBed } from '@angular/core/testing';

import { ExamPlanningService } from './exam-planning.service';

describe('ExamPlanningService', () => {
  let service: ExamPlanningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamPlanningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
