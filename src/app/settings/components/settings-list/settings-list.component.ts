import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSettingsList, SettingsActions } from '../../store';
import { countries } from 'countries-list';
import { map } from 'rxjs';
import { Setting } from '../../../core/api';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.scss'],
})
export class SettingsListComponent implements OnInit {
  settings$ = this.store.select(selectSettingsList).pipe(
    map((settings) =>
      settings.map((setting) => ({
        ...setting,
        value: setting.type.endsWith('List')
          ? [...new Set(setting.value.split(','))]
          : setting.value,
      })),
    ),
  );
  countries = Object.entries(countries).map(([code, country]) => ({
    code,
    name: country.name,
  }));
  currencies = Object.values(countries).map((country) => country.currency);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(SettingsActions.loadSettings());
  }

  save(setting: {
    defaultValue: string;
    builtin: boolean;
    name: string;
    description?: string;
    id: number;
    type: Setting.TypeEnum;
    updated: string;
    value: string[] | string;
  }) {
    const value = Array.isArray(setting.value)
      ? setting.value.join(',')
      : setting.value;
    this.store.dispatch(
      SettingsActions.updateSetting({
        settingId: setting.id,
        data: { value },
      }),
    );
  }
}
