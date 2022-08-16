import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../../core/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CategoriesActions } from '../../store';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

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

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private router: Router,
  ) {}

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

  async delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Category',
        message: 'Are you sure you want to delete this category?',
        confirmButton: 'Delete',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.category) {
        this.store.dispatch(
          CategoriesActions.deleteCategory({ id: this.category.id }),
        );
        this.router.navigate(['/catalog/categories']);
      }
    });
  }
}
