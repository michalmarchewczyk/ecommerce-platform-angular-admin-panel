import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Category } from '../../../core/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CategoriesActions, selectCategoriesGroups } from '../../store';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { combineLatestWith, map } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

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
    groups: new FormControl<string[]>([], {
      nonNullable: true,
    }),
    newGroup: new FormControl(''),
  });

  allGroups$ = this.store.select(selectCategoriesGroups);

  filteredGroups$ = this.allGroups$.pipe(
    combineLatestWith(this.editForm.controls.groups.valueChanges),
    combineLatestWith(this.editForm.controls.newGroup.valueChanges),
    map(([[allGroups, groups], newGroup]) => {
      return allGroups
        .filter((g) => !groups.includes(g.name.toLowerCase()))
        .filter((group) =>
          group.name.toLowerCase().includes(newGroup?.toLowerCase() ?? ''),
        );
    }),
  );

  @ViewChild('groupInput') groupInput!: ElementRef<HTMLInputElement>;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  async ngOnInit() {
    await this.resetValues();
    this.editForm.controls.groups.setValue(
      this.category?.groups.map((g) => g.name) ?? [],
    );
  }

  async resetValues() {
    if (!this.category) {
      return;
    }
    this.editForm.reset({
      name: this.category.name,
      description: this.category.description,
      slug: this.category.slug,
      groups: [],
    });
  }

  removeGroup(group: string) {
    const groups = this.editForm
      .getRawValue()
      .groups.filter((g: string) => g !== group);
    this.editForm.patchValue({ groups });
  }

  addGroup(event: MatChipInputEvent) {
    const value = (event.value || '').trim();

    if (value) {
      const groups = this.editForm.getRawValue().groups;
      if (!groups.includes(value)) {
        groups.push(value.toLowerCase());
        this.editForm.patchValue({ groups });
      }
    }

    event.chipInput!.clear();
    this.editForm.patchValue({ newGroup: '' });
  }

  selected(event: MatAutocompleteSelectedEvent) {
    const groups = this.editForm.getRawValue().groups;
    if (!groups.includes(event.option.value)) {
      groups.push(event.option.value);
      this.editForm.patchValue({ groups });
    }
    this.editForm.patchValue({ newGroup: '' });
    this.groupInput.nativeElement.value = '';
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
          groups: this.editForm.getRawValue().groups.map((g) => ({ name: g })),
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
