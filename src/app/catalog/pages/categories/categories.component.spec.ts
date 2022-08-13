import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesComponent } from './categories.component';
import { provideMockStore } from '@ngrx/store/testing';
import { selectCategoriesList } from '../../store';
import { Category } from '../../../core/api';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectCategoriesList,
              value: [],
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create tree from categories', () => {
    const categories = [
      {
        id: 1,
        name: 'Category A',
        parentCategory: null,
      },
      {
        id: 2,
        name: 'Category B',
        parentCategory: {
          id: 1,
        },
      },
    ] as Category[];

    const result = CategoriesComponent.createTree(categories);
    expect(result).toEqual([
      {
        id: 1,
        name: 'Category A',
        parentCategory: null,
        childCategories: [
          {
            id: 2,
            name: 'Category B',
            parentCategory: {
              id: 1,
            },
            childCategories: [],
          },
        ],
      },
    ] as any);
  });
});
