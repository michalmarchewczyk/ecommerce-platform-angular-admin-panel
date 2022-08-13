import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Category } from '../../../core/api';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CategoriesActions } from '../../store';

@Component({
  selector: 'app-categories-tree',
  templateUrl: './categories-tree.component.html',
  styleUrls: ['./categories-tree.component.scss'],
})
export class CategoriesTreeComponent implements OnInit, OnChanges {
  @Input() tree: Category[] = [];
  treeControl = new NestedTreeControl<Category, number>(
    (node) => node.childCategories,
    { trackBy: (node) => node.id },
  );
  dataSource = new MatTreeNestedDataSource<Category>();
  newNode: { name: string; parentCategory: null | Category } = {
    name: '',
    parentCategory: null,
  };
  newName = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  constructor(private store: Store) {}

  ngOnInit() {
    this.tree = [...this.tree, this.newNode as Category];
    this.dataSource.data = this.tree;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tree']) {
      this.dataSource.data = [];
      this.dataSource.data = this.tree;
    }
  }

  hasChild = (_: number, node: Category) =>
    !!node.childCategories && node.childCategories.length > 0;

  hasNoContent = (_: number, node: Category) => !node.name;

  addCategory(category?: Category) {
    if (this.newNode.parentCategory) {
      this.newNode.parentCategory.childCategories =
        this.newNode.parentCategory.childCategories.filter(
          (c) => c !== this.newNode,
        );
    }
    this.newNode.parentCategory = category ?? null;
    this.tree = this.tree.filter((c) => c !== this.newNode);
    if (category) {
      category.childCategories = [
        ...category.childCategories,
        this.newNode as Category,
      ];
    } else {
      this.tree = [...this.tree, this.newNode as Category];
    }
    this.dataSource.data = [];
    this.dataSource.data = this.tree;
    if (category) {
      this.treeControl.expand(category);
    }
    this.newName.reset();
  }

  add() {
    this.store.dispatch(
      CategoriesActions.addCategory({
        data: {
          name: this.newName.value,
          description: '',
          parentCategoryId: this.newNode.parentCategory?.id,
        },
      }),
    );
  }
}
