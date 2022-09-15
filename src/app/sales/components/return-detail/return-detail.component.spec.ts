import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnDetailComponent } from './return-detail.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { Return } from '../../../core/api';
import { MatInputModule } from '@angular/material/input';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { cold } from 'jasmine-marbles';
import { ReturnsActions } from '../../store';

describe('ReturnDetailComponent', () => {
  let component: ReturnDetailComponent;
  let fixture: ComponentFixture<ReturnDetailComponent>;
  let loader: HarnessLoader;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
        MatSelectModule,
        MatInputModule,
      ],
      declarations: [ReturnDetailComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(ReturnDetailComponent);
    component = fixture.componentInstance;
    component.return = {
      id: 1,
      status: 'open',
      message: 'message',
    } as Return;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set input values', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    expect(inputs.length).toBe(1);
    expect(await inputs[0].getValue()).toBe('message');
    const selects = await loader.getAllHarnesses(MatSelectHarness);
    expect(selects.length).toBe(1);
    expect(await selects[0].getValueText()).toBe('Open');
  });

  it('should dispatch updateReturn action', async () => {
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    await inputs[0].setValue('new message');
    const selects = await loader.getAllHarnesses(MatSelectHarness);
    await selects[0].clickOptions({ text: 'Completed' });
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'Save' }),
    );
    await button.click();
    const expected = cold('a', {
      a: ReturnsActions.updateReturn({
        returnId: 1,
        data: { status: 'completed', message: 'new message' },
      }),
    });
    expect(store.scannedActions$).toBeObservable(expected);
  });
});
