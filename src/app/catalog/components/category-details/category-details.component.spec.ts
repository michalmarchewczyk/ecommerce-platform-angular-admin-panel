import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDetailsComponent } from './category-details.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { Category } from '../../../core/api';
import { MatButtonHarness } from '@angular/material/button/testing';
import { CategoriesActions, selectCategoriesGroups } from '../../store';
import { cold } from 'jasmine-marbles';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {
  MatChipHarness,
  MatChipInputHarness,
} from '@angular/material/chips/testing';
import { TestKey } from '@angular/cdk/testing';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';

describe('CategoryDetailsComponent', () => {
  let component: CategoryDetailsComponent;
  let fixture: ComponentFixture<CategoryDetailsComponent>;
  let store: MockStore;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        NoopAnimationsModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        RouterTestingModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatIconModule,
      ],
      declarations: [CategoryDetailsComponent, ConfirmDialogComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectCategoriesGroups,
              value: [{ name: 'main' }, { name: 'test' }],
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryDetailsComponent);
    component = fixture.componentInstance;
    component.category = {
      id: 1,
      name: 'Category 1',
      description: 'Description 1',
      slug: 'category-1',
      groups: [{ name: 'main' }],
    } as Category;
    store = TestBed.inject(MockStore);
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should ignore when category is not loaded', async () => {
    component.category = null;
    fixture.detectChanges();

    const inputs = await loader.getAllHarnesses(MatInputHarness);
    expect(await inputs[0].getValue()).toBe('');
    expect(await inputs[1].getValue()).toBe('');
    expect(await inputs[2].getValue()).toBe('');
  });

  it('should display category properties', async () => {
    fixture.detectChanges();

    const inputs = await loader.getAllHarnesses(MatInputHarness);
    expect(await inputs[0].getValue()).toBe('Category 1');
    expect(await inputs[1].getValue()).toBe('Description 1');
    expect(await inputs[2].getValue()).toBe('category-1');
  });

  it('should dispatch save action', async () => {
    fixture.detectChanges();

    component.editForm.controls.groups.setValue(['main']);
    component.editForm.controls.newGroup.setValue('');
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    await inputs[0].setValue('Category 2');
    await inputs[1].setValue('Description 2');
    await inputs[2].setValue('category-2');
    component.addGroup({ value: '', chipInput: { clear: () => null } } as any);
    const chipsInput = await loader.getHarness(MatChipInputHarness);
    await chipsInput.setValue('test2');
    await chipsInput.sendSeparatorKey(TestKey.ENTER);
    fixture.detectChanges();
    const chips = await loader.getAllHarnesses(MatChipHarness);
    await chips[0].remove();
    const auto = await loader.getHarness(MatAutocompleteHarness);
    await auto.enterText('test');
    await auto.selectOption({ text: 'test' });

    const saveButton = await loader.getHarness(
      MatButtonHarness.with({ text: 'Save' }),
    );
    await saveButton.click();

    expect(store.scannedActions$).toBeObservable(
      cold('a', {
        a: CategoriesActions.updateCategory({
          id: 1,
          data: {
            name: 'Category 2',
            description: 'Description 2',
            slug: 'category-2',
            groups: [{ name: 'test2' }, { name: 'test' }],
          },
        }),
      }),
    );
  });

  it('should ignore save when category is not loaded', async () => {
    component.category = null;
    fixture.detectChanges();

    await component.save();

    expect(store.scannedActions$).toBeObservable(
      cold('a', { a: { type: '@ngrx/store/init' } }),
    );
  });

  it('should dispatch delete category action', async () => {
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'Delete category' }),
    );
    await button.click();
    const dialog = await loader.getHarness(MatDialogHarness);
    const dialogButton = await dialog.getHarness(
      MatButtonHarness.with({ text: 'Delete' }),
    );
    await dialogButton.click();
    expect(store.scannedActions$).toBeObservable(
      cold('a', {
        a: CategoriesActions.deleteCategory({ id: 1 }),
      }),
    );
  });
});
