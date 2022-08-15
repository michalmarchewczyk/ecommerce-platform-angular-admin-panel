import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CategoriesActions } from '../../store';
import { cold } from 'jasmine-marbles';
import { ActivatedRoute } from '@angular/router';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let store: MockStore;
  let routeId: string | null = '1';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryComponent],
      providers: [
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => routeId,
              },
            },
          },
        },
      ],
    }).compileComponents();

    routeId = '1';
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch selectCategory action on init', () => {
    fixture.detectChanges();
    const expected = cold('a', {
      a: CategoriesActions.selectCategory({ categoryId: 1 }),
    });
    expect(store.scannedActions$).toBeObservable(expected);
  });

  it('should dispatch selectCategory action with null', () => {
    routeId = null;
    fixture.detectChanges();
    const expected = cold('a', {
      a: CategoriesActions.selectCategory({ categoryId: null }),
    });
    expect(store.scannedActions$).toBeObservable(expected);
  });
});
