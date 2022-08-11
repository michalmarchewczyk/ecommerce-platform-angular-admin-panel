import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAttributeItemComponent } from './product-attribute-item.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { Attribute } from '../../../core/api';
import { MatListModule } from '@angular/material/list';

describe('ProductAttributeItemComponent', () => {
  let component: ProductAttributeItemComponent;
  let fixture: ComponentFixture<ProductAttributeItemComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatInputModule,
        MatFormFieldModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatListModule,
      ],
      declarations: [ProductAttributeItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAttributeItemComponent);
    component = fixture.componentInstance;
    component.attribute = {
      id: 1,
      value: 'value',
      type: {
        id: 1,
        name: 'name',
        valueType: 'string',
      },
    } as Attribute;
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should ignore if attribute is null', () => {
    component.attribute = null;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.valueType).toBe('string');
  });

  it('should set correct input type', () => {
    component.attribute = {
      id: 1,
      value: '123',
      type: {
        id: 2,
        name: 'name',
        valueType: 'number',
      },
    } as Attribute;
    fixture.detectChanges();
    expect(component.valueType).toBe('number');
  });

  it('should emit delete event', async () => {
    fixture.detectChanges();
    spyOn(component.delete, 'emit');
    const button = await loader.getHarness(MatButtonHarness);
    await button.click();
    expect(component.delete.emit).toHaveBeenCalledWith(1);
  });

  it('should emit update event', async () => {
    fixture.detectChanges();
    spyOn(component.update, 'emit');
    const input = await loader.getHarness(MatInputHarness);
    await input.setValue('test');
    component.onChange();
    expect(component.update.emit).toHaveBeenCalledWith({
      id: 1,
      value: 'test',
    });
  });

  it('should not emit if attribute is null', async () => {
    fixture.detectChanges();
    spyOn(component.update, 'emit');
    spyOn(component.delete, 'emit');
    component.attribute = null;
    fixture.detectChanges();
    component.onChange();
    component.onDelete();
    expect(component.update.emit).not.toHaveBeenCalled();
    expect(component.delete.emit).not.toHaveBeenCalled();
  });
});
