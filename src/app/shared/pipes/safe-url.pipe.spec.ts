import { SafeUrlPipe } from './safe-url.pipe';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { inject, TestBed } from '@angular/core/testing';

describe('SafeUrlPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
    });
  });
  it('create an instance', inject(
    [DomSanitizer],
    (domSanitizer: DomSanitizer) => {
      const pipe = new SafeUrlPipe(domSanitizer);
      expect(pipe).toBeTruthy();
    },
  ));

  it('should return SafeResourceUrl', inject(
    [DomSanitizer],
    (domSanitizer: DomSanitizer) => {
      const pipe = new SafeUrlPipe(domSanitizer);
      const result = pipe.transform('http://localhost');
      expect(result).toBeTruthy();
    },
  ));
});
