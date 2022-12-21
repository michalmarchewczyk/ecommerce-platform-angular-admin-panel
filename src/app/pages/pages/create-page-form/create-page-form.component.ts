import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PagesActions, selectPagesList } from '../../store';
import { take } from 'rxjs';

@Component({
  selector: 'app-create-page-form',
  templateUrl: './create-page-form.component.html',
  styleUrls: ['./create-page-form.component.scss'],
})
export class CreatePageFormComponent {
  addForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    slug: new FormControl<string>('', {
      nonNullable: true,
    }),
    content: new FormControl('', {
      nonNullable: true,
    }),
  });
  constructor(private store: Store, public router: Router) {}

  async save() {
    this.store.dispatch(
      PagesActions.createPage({
        data: {
          ...this.addForm.getRawValue(),
        },
      }),
    );
    this.store
      .select(selectPagesList)
      .pipe(take(1))
      .subscribe(() => {
        this.router.navigate(['/pages']);
      });
  }
}
