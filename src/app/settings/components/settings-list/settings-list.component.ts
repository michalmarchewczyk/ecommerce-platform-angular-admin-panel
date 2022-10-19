import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSettingsListTransformed, SettingsActions } from '../../store';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.scss'],
})
export class SettingsListComponent implements OnInit {
  settings$ = this.store.select(selectSettingsListTransformed);

  constructor(private store: Store) {}

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

  trackByFn(index: number, item: { id: number }) {
    return item.id;
  }
}
