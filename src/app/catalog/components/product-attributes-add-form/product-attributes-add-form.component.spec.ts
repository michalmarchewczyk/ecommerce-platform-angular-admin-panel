import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAttributesAddFormComponent } from './product-attributes-add-form.component';
import { provideMockStore } from '@ngrx/store/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { selectAttributeTypesList } from '../../store';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { AttributeTypeCreateDialogComponent } from '../attribute-type-create-dialog/attribute-type-create-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputHarness } from '@angular/material/input/testing';

describe('ProductAttributesAddFormComponent', () => {
  let component: ProductAttributesAddFormComponent;
  let fixture: ComponentFixture<ProductAttributesAddFormComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        MatSelectModule,
        MatButtonModule,
        ReactiveFormsModule,
      ],
      declarations: [
        ProductAttributesAddFormComponent,
        AttributeTypeCreateDialogComponent,
      ],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectAttributeTypesList,
              value: [
                {
                  id: 1,
                  name: 'Text',
                  valueType: 'string',
                },
                {
                  id: 2,
                  name: 'Number',
                  valueType: 'number',
                },
              ],
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAttributesAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create new attribute type', async () => {
    const select = await loader.getHarness(MatSelectHarness);
    await select.clickOptions({ text: 'Create new attribute type' });

    const dialog = await loader.getHarness(MatDialogHarness);
    const dialogButton = await dialog.getHarness(
      MatButtonHarness.with({ text: 'Create' }),
    );
    const dialogInput = await dialog.getHarness(MatInputHarness);
    await dialogInput.setValue('Number');
    const dialogSelect = await dialog.getHarness(MatSelectHarness);
    await dialogSelect.clickOptions({ text: 'Number' });
    await dialogButton.click();
    expect(component.valueType).toBe('number');
  });

  it('should ignore if attribute type has not loaded yes', async () => {
    const select = await loader.getHarness(MatSelectHarness);
    await select.clickOptions({ text: 'Create new attribute type' });

    const dialog = await loader.getHarness(MatDialogHarness);
    const dialogButton = await dialog.getHarness(
      MatButtonHarness.with({ text: 'Create' }),
    );
    await dialogButton.click();
    expect(component.valueType).toBe('string');
  });

  it('should ignore if new attribute type is not created', async () => {
    const select = await loader.getHarness(MatSelectHarness);
    await select.clickOptions({ text: 'Create new attribute type' });

    const dialog = await loader.getHarness(MatDialogHarness);
    const dialogButton = await dialog.getHarness(
      MatButtonHarness.with({ text: 'Cancel' }),
    );
    await dialogButton.click();
    expect(component.valueType).toBe('string');
  });

  it('should emit add event', async () => {
    const select = await loader.getHarness(MatSelectHarness);
    await select.clickOptions({ text: 'Text (string)' });
    const input = await loader.getHarness(MatInputHarness);
    await input.setValue('test');

    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'Add' }),
    );

    spyOn(component.add, 'emit');

    await button.click();

    expect(component.add.emit).toHaveBeenCalledWith({
      id: -1,
      typeId: 1,
      value: 'test',
    });
  });
});
