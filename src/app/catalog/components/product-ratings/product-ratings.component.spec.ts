import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRatingsComponent } from './product-ratings.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Product } from '../../../core/api';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTableModule } from '@angular/material/table';
import { RatingStarsComponent } from '../../../shared/components/rating-stars/rating-stars.component';
import { MatIconModule } from '@angular/material/icon';
import {
  MatRowHarness,
  MatTableHarness,
} from '@angular/material/table/testing';
import { cold } from 'jasmine-marbles';
import { ProductRatingsActions } from '../../store';

describe('ProductRatingsComponent', () => {
  let component: ProductRatingsComponent;
  let fixture: ComponentFixture<ProductRatingsComponent>;
  let loader: HarnessLoader;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule, MatIconModule],
      declarations: [ProductRatingsComponent, RatingStarsComponent],
      providers: [
        provideMockStore({
          initialState: {
            catalog: {
              productRatings: {
                ratings: {
                  1: [
                    {
                      id: 1,
                      productId: 1,
                      rating: 3,
                      user: {
                        email: 'test@test.local',
                      },
                      comment: 'test',
                    } as any,
                  ],
                },
              },
            },
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductRatingsComponent);
    component = fixture.componentInstance;
    component.product = {
      id: 1,
      name: 'Test',
    } as Product;

    loader = TestbedHarnessEnvironment.loader(fixture);
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should dispatch loadProductRatings action', () => {
    fixture.detectChanges();
    expect(store.scannedActions$).toBeObservable(
      cold('a', {
        a: ProductRatingsActions.loadProductRatings({ productId: 1 }),
      }),
    );
  });

  it('should ignore if product is not set', () => {
    component.product = null;
    fixture.detectChanges();
    expect(store.scannedActions$).toBeObservable(
      cold('a', { a: { type: '@ngrx/store/init' } }),
    );
  });

  it('should render table', async () => {
    fixture.detectChanges();
    const table = await loader.getHarness(MatTableHarness);
    expect(table).toBeTruthy();
    const [row] = await table.getHeaderRows();
    expect(await row.getCellTextByIndex()).toEqual([
      'ID',
      'Created',
      'User',
      'Rating',
      'Comment',
      '',
    ]);
  });

  it('should render review row', async () => {
    fixture.detectChanges();
    const row = await loader.getHarness(MatRowHarness);
    expect(row).toBeTruthy();
    expect(await row.getCellTextByIndex()).toEqual([
      '1',
      '',
      'test@test.local',
      'starstarstarstar_borderstar_border',
      'test',
      'keyboard_arrow_down',
    ]);
  });
});
