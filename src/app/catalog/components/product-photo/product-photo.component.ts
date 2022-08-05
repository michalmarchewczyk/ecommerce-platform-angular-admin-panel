import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../../core/api';
import { selectProductPhoto } from '../../store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-photo',
  templateUrl: './product-photo.component.html',
  styleUrls: ['./product-photo.component.scss'],
})
export class ProductPhotoComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  @Input() photoId: number | null = null;
  photo$ = this.store.select(selectProductPhoto(this.photoId ?? 0));
  photoUrl: string = '';
  private subscription!: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.photoId = this.photoId ?? this.product?.photos[0]?.id ?? null;
    this.photo$ = this.store.select(selectProductPhoto(this.photoId ?? 0));
    this.subscription = this.photo$.subscribe((photo) => {
      this.photoUrl = photo?.data ? URL.createObjectURL(photo.data) : '';
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
