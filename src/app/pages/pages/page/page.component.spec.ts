import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageComponent } from './page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PagesActions, selectPagesGroups, selectPagesList } from '../../store';
import { Page, PageGroup } from '../../../core/api';
import { ActivatedRoute } from '@angular/router';
import { HarnessLoader, TestKey } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { cold } from 'jasmine-marbles';
import {
  MatChipHarness,
  MatChipInputHarness,
} from '@angular/material/chips/testing';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;
  let store: MockStore;
  let loader: HarnessLoader;
  let routeId: string | null = '1';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        MatDialogModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatButtonModule,
      ],
      declarations: [PageComponent, ConfirmDialogComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectPagesList,
              value: [
                {
                  id: 1,
                  title: 'Page 1',
                  slug: 'page-1',
                  content: 'Content 1',
                  groups: [
                    {
                      id: 2,
                      name: 'main',
                    } as PageGroup,
                  ],
                } as Page,
              ],
            },
            {
              selector: selectPagesGroups,
              value: [
                {
                  id: 1,
                  name: 'test',
                } as PageGroup,
                {
                  id: 2,
                  name: 'main',
                } as PageGroup,
              ],
            },
          ],
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => routeId }),
          },
        },
      ],
    }).compileComponents();

    routeId = '1';
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display page properties', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    expect(await inputs[0].getValue()).toBe('Page 1');
    expect(await inputs[1].getValue()).toBe('page-1');
    expect(await inputs[2].getValue()).toBe('Content 1');
  });

  it('should dispatch save action', async () => {
    component.editForm.controls.groups.setValue(['main']);
    component.editForm.controls.newGroup.setValue('');
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    await inputs[0].setValue('Page 2');
    await inputs[1].setValue('page-2');
    await inputs[2].setValue('Content 2');
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
        a: PagesActions.updatePage({
          pageId: 1,
          data: {
            title: 'Page 2',
            slug: 'page-2',
            content: 'Content 2',
            groups: [{ name: 'test2' }, { name: 'test' }],
          },
        }),
      }),
    );
  });

  it('should ignore save when page is not loaded', async () => {
    routeId = null;

    await component.save();
    expect(store.scannedActions$).toBeObservable(
      cold('a', { a: { type: '@ngrx/store/init' } }),
    );
  });

  it('should dispatch delete page action', async () => {
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'Delete page' }),
    );
    await button.click();
    const dialog = await loader.getHarness(MatDialogHarness);
    const dialogButton = await dialog.getHarness(
      MatButtonHarness.with({ text: 'Delete' }),
    );
    await dialogButton.click();
    expect(store.scannedActions$).toBeObservable(
      cold('a', {
        a: PagesActions.deletePage({ pageId: 1 }),
      }),
    );
  });
});
