import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import {
  combineLatestWith,
  firstValueFrom,
  Observable,
  Subscription,
} from 'rxjs';
import { PagesActions, selectPagesGroups, selectPagesList } from '../../store';
import { Page } from '../../../core/api';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit, OnDestroy {
  page$: Observable<Page | null> = this.route.paramMap.pipe(
    combineLatestWith(this.store.select(selectPagesList)),
    map(([params, pages]) => {
      const id = parseInt(params.get('id') ?? '-1');
      return pages.find((page) => page.id === id) ?? null;
    }),
  );

  editForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    slug: new FormControl('', {
      nonNullable: true,
    }),
    content: new FormControl('', {
      nonNullable: true,
    }),
    groups: new FormControl<string[]>([], {
      nonNullable: true,
    }),
    newGroup: new FormControl(''),
  });

  allGroups$ = this.store.select(selectPagesGroups);

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
  private subscription!: Subscription;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  async ngOnInit() {
    await this.resetValues();
    this.subscription = this.page$.subscribe(() => this.resetValues());
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  async resetValues() {
    const page = await firstValueFrom(this.page$);
    if (page) {
      this.editForm.reset({
        title: page.title,
        slug: page.slug,
        content: page.content,
        groups: [],
      });
      this.editForm.controls.groups.setValue(page.groups.map((g) => g.name));
    }
  }
  removeGroup(group: string) {
    const groups = this.editForm
      .getRawValue()
      .groups.filter((g) => g !== group);
    this.editForm.patchValue({ groups });
    this.editForm.markAsDirty();
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
    const page = await firstValueFrom(this.page$);
    if (!page) {
      return;
    }
    this.store.dispatch(
      PagesActions.updatePage({
        pageId: page.id,
        data: {
          title: this.editForm.value.title,
          slug: this.editForm.value.slug,
          content: this.editForm.value.content,
          groups: this.editForm.getRawValue().groups.map((g) => ({ name: g })),
        },
      }),
    );
  }

  async delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Page',
        message: 'Are you sure you want to delete this page?',
        confirmButton: 'Delete',
      },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        const page = await firstValueFrom(this.page$);
        if (page) {
          this.store.dispatch(PagesActions.deletePage({ pageId: page.id }));
          await this.router.navigate(['/pages']);
        }
      }
    });
  }
}
