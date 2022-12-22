import { Component } from '@angular/core';
import { ImportExportService } from '../../services/import-export.service';
import { FileInput } from 'ngx-material-file-input';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent {
  file: FileInput = new FileInput([]);
  clear = false;
  noImport = false;

  loading = false;
  result = {};

  constructor(
    private importExportService: ImportExportService,
    private dialog: MatDialog,
  ) {}

  async submit() {
    if (!this.file.files[0]) {
      return;
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Import',
        message: `Are you sure you want to ${
          this.clear ? (this.noImport ? 'delete' : 'replace') : 'import'
        } data?`,
        confirmButton: 'Import',
      },
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) {
        return;
      }
      this.loading = true;
      this.result = await this.importExportService.import(
        this.file.files[0],
        this.clear,
        this.noImport,
      );
      this.loading = false;
    });
  }
}
