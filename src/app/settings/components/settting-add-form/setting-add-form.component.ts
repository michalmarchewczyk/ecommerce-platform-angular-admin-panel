import { Component } from '@angular/core';
import { Setting } from '../../../core/api';
import TypeEnum = Setting.TypeEnum;
import { Store } from '@ngrx/store';
import { SettingsActions } from '../../store';

@Component({
  selector: 'app-setting-add-form',
  templateUrl: './setting-add-form.component.html',
  styleUrls: ['./setting-add-form.component.scss'],
})
export class SettingAddFormComponent {
  types = Object.values(TypeEnum);
  type: TypeEnum = TypeEnum.String;
  name: string = '';
  description: string = '';
  defaultValue: string | string[] = '';

  constructor(private store: Store) {}

  changeType(type: TypeEnum) {
    if (type.endsWith('List')) {
      this.defaultValue = [];
    } else {
      this.defaultValue = '';
    }
  }

  save() {
    this.store.dispatch(
      SettingsActions.createSetting({
        data: {
          type: this.type,
          name: this.name,
          description: this.description,
          defaultValue: Array.isArray(this.defaultValue)
            ? this.defaultValue.join(',')
            : this.defaultValue,
        },
      }),
    );
  }
}
