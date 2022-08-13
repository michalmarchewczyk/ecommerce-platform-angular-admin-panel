import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesTreeComponent } from './categories-tree.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTreeHarness } from '@angular/material/tree/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputHarness } from '@angular/material/input/testing';
import { CategoriesActions } from '../../store';
import { cold } from 'jasmine-marbles';
import { SimpleChange } from '@angular/core';

describe('CategoriesTreeComponent', () => {
  let component: CategoriesTreeComponent;
  let fixture: ComponentFixture<CategoriesTreeComponent>;
  let loader: HarnessLoader;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTreeModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [CategoriesTreeComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesTreeComponent);
    component = fixture.componentInstance;
    component.tree = [
      {
        id: 1,
        name: 'Category A',
        parentCategory: null,
        childCategories: [
          {
            id: 2,
            name: 'Category A1',
            parentCategory: {
              id: 1,
            },
            childCategories: [],
          },
        ],
      },
    ] as any;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render categories tree', async () => {
    const tree = await loader.getHarness(MatTreeHarness);
    const nodes = await tree.getNodes();
    expect(nodes.length).toBe(4);
    expect(await nodes[1].getText()).toBe('Category A');
    expect(await nodes[2].getText()).toBe('Category A1');
  });

  it('should render new category input', async () => {
    component.addCategory(component.tree[0]);
    fixture.detectChanges();

    const tree = await loader.getHarness(MatTreeHarness);
    const nodes = await tree.getNodes();
    expect(nodes.length).toBe(4);
    expect(await nodes[3].getText()).toBe('Name *');

    component.addCategory(component.tree[0].childCategories[0]);
    fixture.detectChanges();

    const nodes2 = await tree.getNodes();
    expect(await nodes2[4].getText()).toBe('Name *');

    component.addCategory();
    fixture.detectChanges();

    const nodes3 = await tree.getNodes();
    expect(await nodes3[3].getText()).toBe('Name *');
  });

  it('should dispatch add category action', async () => {
    component.addCategory(component.tree[0]);
    fixture.detectChanges();

    const input = await loader.getHarness(MatInputHarness);
    await input.setValue('Category A2');

    component.add();

    expect(store.scannedActions$).toBeObservable(
      cold('a', {
        a: CategoriesActions.addCategory({
          data: {
            name: 'Category A2',
            description: '',
            parentCategoryId: 1,
          },
        }),
      }),
    );
  });

  it('should render categories after update', async () => {
    component.tree = [];
    fixture.detectChanges();
    component.ngOnChanges({
      tree: new SimpleChange(null, component.tree, false),
    });

    const tree = await loader.getHarness(MatTreeHarness);
    const nodes = await tree.getNodes();
    expect(nodes.length).toBe(0);
  });
});
