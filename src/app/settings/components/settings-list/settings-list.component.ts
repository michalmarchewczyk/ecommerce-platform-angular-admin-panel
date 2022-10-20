import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSettingsListTransformed, SettingsActions } from '../../store';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.scss'],
})
export class SettingsListComponent implements OnInit {
  settings$ = this.store.select(selectSettingsListTransformed);
  @Input() builtin: boolean = true;

  filteredSettings$ = this.settings$.pipe(
    map((settings) =>
      settings.filter((setting) => setting.builtin === this.builtin),
    ),
  );

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(SettingsActions.loadSettings());
  }

  save(settingId: number, value: string | string[]) {
    value = Array.isArray(value) ? value.join(',') : value;
    this.store.dispatch(
      SettingsActions.updateSetting({
        settingId: settingId,
        data: { value: value.toString() },
      }),
    );
  }

  delete(settingId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete setting',
        message: 'Are you sure you want to delete this setting?',
        confirmButton: 'Delete',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(SettingsActions.deleteSetting({ settingId }));
      }
    });
  }

  trackByFn(index: number, item: { id: number }) {
    return item.id;
  }
}
