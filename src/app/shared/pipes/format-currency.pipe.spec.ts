import { FormatCurrencyPipe } from './format-currency.pipe';
import { PipeTransform } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestBed } from '@angular/core/testing';

describe('FormatCurrencyPipe', () => {
  let pipe: PipeTransform;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            settings: {
              settings: {
                list: [
                  {
                    id: 1,
                    name: 'Currency',
                    value: 'EUR',
                  },
                ],
              },
            },
          },
        }),
      ],
    });

    store = TestBed.inject(MockStore);
    pipe = new FormatCurrencyPipe(store);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format currency', () => {
    expect(pipe.transform(100)).toEqual('€100.00');
  });
});
