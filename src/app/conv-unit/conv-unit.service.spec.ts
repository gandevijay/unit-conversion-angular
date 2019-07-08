import { TestBed } from '@angular/core/testing';

import { ConvUnitService } from './conv-unit.service';

describe('ConvUnitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConvUnitService = TestBed.get(ConvUnitService);
    expect(service).toBeTruthy();
  });
});
