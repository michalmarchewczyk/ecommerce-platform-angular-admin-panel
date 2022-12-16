import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRatingDetailsComponent } from './product-rating-details.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RatingStarsComponent } from '../../../shared/components/rating-stars/rating-stars.component';
import { ProductRatingsActions } from '../../store';
import { By } from '@angular/platform-browser';
import { MatButtonHarness } from '@angular/material/button/testing';
import { cold } from 'jasmine-marbles';

describe('ProductRatingDetailsComponent', () => {
  let component: ProductRatingDetailsComponent;
  let fixture: ComponentFixture<ProductRatingDetailsComponent>;
  let loader: HarnessLoader;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatButtonModule, MatIconModule],
      declarations: [ProductRatingDetailsComponent, RatingStarsComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductRatingDetailsComponent);
    component = fixture.componentInstance;
    component.productId = 1;
    component.rating = {
      id: 1,
      rating: 4,
      comment: 'test comment',
      user: {
        id: 1,
        email: 'test@test.local',
      },
    } as any;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the rating stars', async () => {
    const text = await fixture.debugElement.query(By.css('.rating-data'))
      .nativeElement.textContent;
    expect(text).toContain('(4 / 5)');
    expect(text).toContain('test comment');
    expect(text).toContain('test@test.local (#1)');
    expect(text).toContain('Rating: starstarstarstarstar_border');
  });

  it('should dispatch deleteProductRating action', async () => {
    const deleteButton = await loader.getHarness(
      MatButtonHarness.with({ text: 'Delete' }),
    );
    await deleteButton.click();
    expect(store.scannedActions$).toBeObservable(
      cold('a', {
        a: ProductRatingsActions.deleteProductRating({ productId: 1, id: 1 }),
      }),
    );
  });
});
