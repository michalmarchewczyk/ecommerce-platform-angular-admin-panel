import { Component, Input } from '@angular/core';
import { Order } from '../../../core/api';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent {
  @Input() order: Order | null = null;

  constructor() {}
}
