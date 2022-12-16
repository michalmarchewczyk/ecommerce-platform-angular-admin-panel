import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductRating } from '../../../core/api';
import { Store } from '@ngrx/store';
import { ProductRatingsActions } from '../../store';

@Component({
  selector: 'app-product-rating-details',
  templateUrl: './product-rating-details.component.html',
  styleUrls: ['./product-rating-details.component.scss'],
})
export class ProductRatingDetailsComponent {
  @Input() rating!: ProductRating;
  @Input() productId!: number;

  @Output() cancel = new EventEmitter<void>();

  constructor(private store: Store) {}

  delete() {
    this.store.dispatch(
      ProductRatingsActions.deleteProductRating({
        productId: this.productId,
        id: this.rating.id,
      }),
    );
  }
}
