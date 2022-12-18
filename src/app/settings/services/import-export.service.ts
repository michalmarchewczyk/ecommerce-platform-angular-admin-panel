import { Injectable } from '@angular/core';
import { ExportDto, ImportExportApiService } from '../../core/api';
import DataEnum = ExportDto.DataEnum;
import FormatEnum = ExportDto.FormatEnum;
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImportExportService {
  constructor(private importExportApi: ImportExportApiService) {}

  async export(data: DataEnum[], format: FormatEnum) {
    const res = this.importExportApi._export({ data, format }, 'response');

    const response = await firstValueFrom(res);
    const blob = response.body;
    const filename = `export-${new Date().toISOString()}.${
      format === 'json' ? 'json' : 'tar.gz'
    }`;
    if (!blob) {
      return;
    }
    const url = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}
