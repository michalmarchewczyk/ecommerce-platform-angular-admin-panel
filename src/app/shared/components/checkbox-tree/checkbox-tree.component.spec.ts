import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  CheckboxTreeComponent,
  getCheckboxTreeValues,
} from './checkbox-tree.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';

describe('CheckboxTreeComponent', () => {
  let component: CheckboxTreeComponent;
  let fixture: ComponentFixture<CheckboxTreeComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCheckboxModule, FormsModule],
      declarations: [CheckboxTreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxTreeComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    component.tree = [
      {
        name: 'A',
        value: 'a',
        children: [
          {
            name: 'AA',
            value: 'aa',
          },
          {
            name: 'AB',
            value: 'ab',
          },
        ],
      },
      {
        name: 'B',
        value: 'b',
        dependencies: ['a'],
      },
    ];
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should calculate indeterminate state', async () => {
    fixture.detectChanges();
    const checkbox = await loader.getHarness(
      MatCheckboxHarness.with({ label: 'AA' }),
    );
    await checkbox.check();
    fixture.detectChanges();
    const parentCheckbox = await loader.getHarness(
      MatCheckboxHarness.with({ label: 'A' }),
    );
    expect(await parentCheckbox.isIndeterminate()).toBeTrue();
  });

  it('should calculate dependencies', async () => {
    fixture.detectChanges();
    const dependentCheckbox = await loader.getHarness(
      MatCheckboxHarness.with({ label: 'B' }),
    );
    expect(await dependentCheckbox.isDisabled()).toBeTrue();
    const checkbox = await loader.getHarness(
      MatCheckboxHarness.with({ label: 'A' }),
    );
    await checkbox.check();
    fixture.detectChanges();
    expect(await dependentCheckbox.isDisabled()).toBeFalse();
    await dependentCheckbox.check();
    await checkbox.uncheck();
    fixture.detectChanges();
    expect(await dependentCheckbox.isChecked()).toBeFalse();
  });

  it('should update parent state', async () => {
    fixture.detectChanges();
    const checkbox = await loader.getHarness(
      MatCheckboxHarness.with({ label: 'AA' }),
    );
    await checkbox.check();
    const checkbox2 = await loader.getHarness(
      MatCheckboxHarness.with({ label: 'AB' }),
    );
    await checkbox2.check();
    fixture.detectChanges();
    const parentCheckbox = await loader.getHarness(
      MatCheckboxHarness.with({ label: 'A' }),
    );
    expect(await parentCheckbox.isChecked()).toBeTrue();
  });

  it('should update children state', async () => {
    fixture.detectChanges();
    const parentCheckbox = await loader.getHarness(
      MatCheckboxHarness.with({ label: 'A' }),
    );
    await parentCheckbox.check();
    fixture.detectChanges();
    const checkbox = await loader.getHarness(
      MatCheckboxHarness.with({ label: 'AA' }),
    );
    expect(await checkbox.isChecked()).toBeTrue();
    const checkbox2 = await loader.getHarness(
      MatCheckboxHarness.with({ label: 'AB' }),
    );
    expect(await checkbox2.isChecked()).toBeTrue();
  });

  it('should emit update event if is child', async () => {
    component.child = true;
    fixture.detectChanges();
    spyOn(component.updated, 'emit');
    component.update(component.tree[1]);
    expect(component.updated.emit).toHaveBeenCalledWith(component.tree[1]);
  });

  it('should get values from tree', async () => {
    fixture.detectChanges();
    const checkbox = await loader.getHarness(
      MatCheckboxHarness.with({ label: 'AA' }),
    );
    await checkbox.check();
    fixture.detectChanges();
    expect(getCheckboxTreeValues(component.tree)).toEqual(['a', 'aa']);
  });
});
