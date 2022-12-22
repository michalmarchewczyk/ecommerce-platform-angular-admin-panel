import { TestBed } from '@angular/core/testing';

import { ImportExportService } from './import-export.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ImportExportService', () => {
  let service: ImportExportService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImportExportService],
    });

    service = TestBed.inject(ImportExportService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an export download', async () => {
    const spyObj = jasmine.createSpyObj('a', ['click']);
    spyOn(document, 'createElement').and.returnValue(spyObj);
    spyOn(document.body, 'appendChild');
    spyOn(document.body, 'removeChild');
    const res = service.export([], 'json');
    httpTestingController
      .expectOne({ method: 'POST' })
      .flush(new Blob(['test']), {
        headers: { 'Content-Disposition': 'attachment; filename=test.json' },
      });
    await res;
    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(document.body.appendChild).toHaveBeenCalledWith(spyObj);
    expect(spyObj.click).toHaveBeenCalledTimes(1);
    expect(document.body.removeChild).toHaveBeenCalledWith(spyObj);
  });

  it('should ignore if filename is empty', async () => {
    spyOn(document, 'createElement');
    const res = service.export([], 'json');
    httpTestingController
      .expectOne({ method: 'POST' })
      .flush(new Blob(['test']));
    await res;
    expect(document.createElement).not.toHaveBeenCalled();
  });

  it('should import a file', async () => {
    const file = new File(['test'], 'test.json', { type: 'application/json' });
    const res = service.import(file, false, false);
    httpTestingController.expectOne({ method: 'POST' }).flush({});
    expect(await res).toEqual({});
  });
});
