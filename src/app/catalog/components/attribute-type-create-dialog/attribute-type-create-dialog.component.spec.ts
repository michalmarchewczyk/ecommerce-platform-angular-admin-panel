import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeTypeCreateDialogComponent } from './attribute-type-create-dialog.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { cold } from 'jasmine-marbles';
import { AttributeTypesActions } from '../../store';

describe('AttributeTypeCreateDialogComponent', () => {
  let component: AttributeTypeCreateDialogComponent;
  let fixture: ComponentFixture<AttributeTypeCreateDialogComponent>;
  let loader: HarnessLoader;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        MatDialogModule,
        MatSelectModule,
        ReactiveFormsModule,
      ],
      declarations: [AttributeTypeCreateDialogComponent],
      providers: [
        provideMockStore(),
        {
          provide: MatDialogRef,
          useValue: {
            close: jasmine.createSpy('close'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AttributeTypeCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
    store = TestBed.inject(MockStore);
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

  it('should create attribute type', async () => {
    const select = await loader.getHarness(MatSelectHarness);
    await select.clickOptions({ text: 'Number' });
    const input = await loader.getHarness(MatInputHarness);
    await input.setValue('test');
    fixture.detectChanges();
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'Create' }),
    );
    await button.click();
    expect(component.dialogRef.close).toHaveBeenCalledWith({
      name: 'test',
      valueType: 'number',
    });
    expect(store.scannedActions$).toBeObservable(
      cold('a', {
        a: AttributeTypesActions.addAttributeType({
          data: {
            name: 'test',
            valueType: 'number',
          },
        }),
      }),
    );
  });
});
