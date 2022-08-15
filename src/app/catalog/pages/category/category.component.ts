import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CategoriesActions, selectSelectedCategory } from '../../store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  category$ = this.store.select(selectSelectedCategory);

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit() {
    this.store.dispatch(
      CategoriesActions.selectCategory({
        categoryId:
          parseInt(this.route.snapshot.paramMap.get('id') ?? '0') || null,
      }),
    );
  }

  ngOnDestroy() {
    this.store.dispatch(CategoriesActions.selectCategory({ categoryId: null }));
  }
}
