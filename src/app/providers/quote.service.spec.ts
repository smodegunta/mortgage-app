import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CoreModule, HttpCacheService } from '@app/core';
import { QuoteService } from '@app/providers/quote.service';

describe('QuoteService', () => {
  let quoteService: QuoteService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        HttpClientTestingModule
      ],
      providers: [
        HttpCacheService,
        QuoteService
      ]
    });
  }));

  beforeEach(inject([
    HttpCacheService,
    QuoteService,
    HttpTestingController
  ], (htttpCacheService: HttpCacheService,
      _quoteService: QuoteService,
      _httpMock: HttpTestingController) => {

    quoteService = _quoteService;
    httpMock = _httpMock;

    htttpCacheService.cleanCache();
  }));

  afterEach(() => {
    httpMock.verify();
  });
});
