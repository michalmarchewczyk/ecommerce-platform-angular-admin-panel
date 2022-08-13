import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoriesActions, selectCategoriesList } from '../../store';
import { map } from 'rxjs/operators';
import { Category } from '../../../core/api';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories$ = this.store.select(selectCategoriesList);
  categoriesTree$ = this.categories$.pipe(
    map((categories) => {
      return CategoriesComponent.createTree(categories);
    }),
  );

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(CategoriesActions.loadCategories());
  }

  static createTree(categories: Category[]): Category[] {
    const hashTable = Object.create(null);
    categories.forEach(
      (category) =>
        (hashTable[category.id] = { ...category, childCategories: [] }),
    );
    const dataTree: Category[] = [];
    categories.forEach((category) => {
      if (category.parentCategory?.id) {
        hashTable[category.parentCategory.id].childCategories.push(
          hashTable[category.id],
        );
      } else {
        dataTree.push(hashTable[category.id]);
      }
    });
    return dataTree;
  }
}
