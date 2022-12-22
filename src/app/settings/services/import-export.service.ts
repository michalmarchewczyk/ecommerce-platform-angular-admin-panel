import { Injectable } from '@angular/core';
import { ExportDto, ImportExportApiService } from '../../core/api';
import { firstValueFrom } from 'rxjs';
import DataEnum = ExportDto.DataEnum;
import FormatEnum = ExportDto.FormatEnum;

@Injectable({
  providedIn: 'root',
})
export class ImportExportService {
  constructor(private importExportApi: ImportExportApiService) {}

  async export(data: DataEnum[], format: FormatEnum) {
    const res = this.importExportApi._export({ data, format }, 'response');

    const response = await firstValueFrom(res);
    const blob = response.body;
    const filename = response.headers.get('Content-Disposition')?.split('=')[1];
    if (!blob || !filename) {
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

  async import(file: File, clear: boolean, noImport: boolean) {
    const res = this.importExportApi._import(
      file,
      clear.toString(),
      noImport.toString(),
    );
    return await firstValueFrom(res);
  }
}
