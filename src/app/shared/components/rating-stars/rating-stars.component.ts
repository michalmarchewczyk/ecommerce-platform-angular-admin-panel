import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss'],
})
export class RatingStarsComponent {
  @Input() rating: number = 0;
  @Input() maxRating: number = 5;

  constructor() {}

  getStars() {
    return Array(this.maxRating)
      .fill(0)
      .map((_, i) => i < this.rating);
  }
}
