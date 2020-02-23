import { TestBed } from '@angular/core/testing';

import { PlataformaService } from './plataforma.service';

describe('PlataformaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlataformaService = TestBed.get(PlataformaService);
    expect(service).toBeTruthy();
  });
});
