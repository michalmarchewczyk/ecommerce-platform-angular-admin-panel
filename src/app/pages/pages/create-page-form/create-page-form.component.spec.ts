import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePageFormComponent } from './create-page-form.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { cold } from 'jasmine-marbles';
import { PagesActions, selectPagesList } from '../../store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CreatePageFormComponent', () => {
  let component: CreatePageFormComponent;
  let fixture: ComponentFixture<CreatePageFormComponent>;
  let store: MockStore;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [CreatePageFormComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectPagesList,
              value: [],
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch save action', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    await inputs[0].setValue('Test page');
    await inputs[1].setValue('test-slug');
    await inputs[2].setValue('Test content');

    const saveButton = await loader.getHarness(
      MatButtonHarness.with({ text: 'Create' }),
    );
    await saveButton.click();

    expect(store.scannedActions$).toBeObservable(
      cold('a', {
        a: PagesActions.createPage({
          data: {
            title: 'Test page',
            slug: 'test-slug',
            content: 'Test content',
          },
        }),
      }),
    );
  });
});
