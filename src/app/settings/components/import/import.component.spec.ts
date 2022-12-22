import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportComponent } from './import.component';
import { ImportExportService } from '../../services/import-export.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { FileInput, MaterialFileInputModule } from 'ngx-material-file-input';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatSlideToggleHarness } from '@angular/material/slide-toggle/testing';

describe('ImportComponent', () => {
  let component: ImportComponent;
  let fixture: ComponentFixture<ImportComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSlideToggleModule,
        NoopAnimationsModule,
        FormsModule,
        MatDialogModule,
        MaterialFileInputModule,
      ],
      declarations: [ImportComponent, ConfirmDialogComponent],
      providers: [
        {
          provide: ImportExportService,
          useValue: {
            import: async () => {
              return {};
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call import function', async () => {
    const service = TestBed.inject(ImportExportService);
    const spy = spyOn(service, 'import');
    const file = new File([''], 'test.json', {
      type: 'application/json',
    });
    component.file = new FileInput([file]);
    fixture.detectChanges();
    const slideToggles = await loader.getAllHarnesses(MatSlideToggleHarness);
    await slideToggles[0].toggle();
    await slideToggles[1].toggle();
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'Import' }),
    );
    await button.click();
    const dialog = await loader.getHarness(MatDialogHarness);
    const dialogButton = await dialog.getHarness(
      MatButtonHarness.with({ text: 'Import' }),
    );
    await dialogButton.click();
    expect(spy).toHaveBeenCalledWith(file, true, true);
  });

  it('should ignore if no file is selected', async () => {
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'Import' }),
    );
    await button.click();
    await expectAsync(loader.getHarness(MatDialogHarness)).toBeRejected();
  });

  it('should ignore if cancelled', async () => {
    const service = TestBed.inject(ImportExportService);
    const spy = spyOn(service, 'import');
    const file = new File([''], 'test.json', {
      type: 'application/json',
    });
    component.file = new FileInput([file]);
    fixture.detectChanges();
    const button = await loader.getHarness(
      MatButtonHarness.with({ text: 'Import' }),
    );
    await button.click();
    const dialog = await loader.getHarness(MatDialogHarness);
    const dialogButton = await dialog.getHarness(
      MatButtonHarness.with({ text: 'Cancel' }),
    );
    await dialogButton.click();
    expect(spy).not.toHaveBeenCalled();
  });
});
