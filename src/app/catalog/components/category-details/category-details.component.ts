import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../../core/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CategoriesActions } from '../../store';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit {
  @Input() category: Category | null = null;

  editForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      nonNullable: true,
    }),
    slug: new FormControl('', {
      nonNullable: true,
    }),
  });

  constructor(private store: Store) {}

  async ngOnInit() {
    await this.resetValues();
  }

  async resetValues() {
    if (!this.category) {
      return;
    }
    this.editForm.reset({
      name: this.category.name,
      description: this.category.description,
      slug: this.category.slug,
    });
  }

  async save() {
    if (!this.category) {
      return;
    }
    this.store.dispatch(
      CategoriesActions.updateCategory({
        id: this.category.id,
        data: {
          name: this.editForm.value.name,
          description: this.editForm.value.description,
          slug: this.editForm.value.slug,
        },
      }),
    );
    this.editForm.markAsPristine();
  }
}
