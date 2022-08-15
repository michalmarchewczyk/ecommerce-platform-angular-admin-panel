import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoriesActions } from '../../store';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(CategoriesActions.loadCategories());
  }
}
