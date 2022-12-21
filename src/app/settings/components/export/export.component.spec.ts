import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportComponent } from './export.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ImportExportService } from '../../services/import-export.service';
import { ExportDto } from '../../../core/api';
import DataEnum = ExportDto.DataEnum;
import FormatEnum = ExportDto.FormatEnum;
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectHarness } from '@angular/material/select/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ExportComponent', () => {
  let component: ExportComponent;
  let fixture: ComponentFixture<ExportComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatButtonModule,
        NoopAnimationsModule,
      ],
      declarations: [ExportComponent],
      providers: [
        {
          provide: ImportExportService,
          useValue: {
            export: async (_: DataEnum[], format: FormatEnum) => {
              return format;
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call export function', async () => {
    const service = TestBed.inject(ImportExportService);
    const spy = spyOn(service, 'export');
    component.dataToExport[0].selected = true;
    component.dataToExport[1].selected = true;
    component.dataToExport[3].selected = true;
    const select = await loader.getHarness(MatSelectHarness);
    await select.clickOptions({ text: 'csv' });
    const downloadButton = await loader.getHarness(
      MatButtonHarness.with({ text: 'Download' }),
    );
    await downloadButton.click();
    expect(spy).toHaveBeenCalledWith(['settings', 'pages'], 'csv');
  });
});
