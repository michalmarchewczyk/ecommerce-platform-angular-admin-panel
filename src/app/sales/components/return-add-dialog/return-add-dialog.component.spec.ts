import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnAddDialogComponent } from './return-add-dialog.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
  OrdersActions,
  ReturnsActions,
  selectOrdersListWithItems,
  selectReturnsList,
} from '../../store';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { cold } from 'jasmine-marbles';
import { DatePipe } from '@angular/common';

describe('AddReturnDialogComponent', () => {
  let component: ReturnAddDialogComponent;
  let fixture: ComponentFixture<ReturnAddDialogComponent>;
  let loader: HarnessLoader;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      declarations: [ReturnAddDialogComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectReturnsList,
              value: [
                {
                  id: 1,
                  order: {
                    id: 1,
                  },
                },
              ],
            },
            {
              selector: selectOrdersListWithItems,
              value: [
                {
                  id: 1,
                  created: '0',
                  itemsTotal: 100,
                },
                {
                  id: 2,
                  created: '0',
                  itemsTotal: 200,
                },
              ],
            },
          ],
        }),
        {
          provide: MatDialogRef,
          useValue: {
            close: jasmine.createSpy('close'),
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            orderId: null,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog', async () => {
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'Cancel' }),
    );
    await button.click();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should ignore if orderId is not selected', () => {
    component.add();
    expect(store.scannedActions$).toBeObservable(
      cold('a', { a: OrdersActions.loadOrders() }),
    );
  });

  it('should dispatch createReturn action', async () => {
    const select = await loader.getHarness(MatSelectHarness);
    await select.clickOptions({
      text: `#2 ${new DatePipe('en').transform('0', 'short')} - 200`,
    });

    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'Create' }),
    );
    await button.click();

    expect(store.scannedActions$).toBeObservable(
      cold('a', {
        a: ReturnsActions.createReturn({ data: { orderId: 2, message: '' } }),
      }),
    );
  });
});
