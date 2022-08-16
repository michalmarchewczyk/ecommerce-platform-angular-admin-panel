import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../core/api';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product: Product | null = null;

  @Output() delete = new EventEmitter<number>();

  constructor() {}
}
