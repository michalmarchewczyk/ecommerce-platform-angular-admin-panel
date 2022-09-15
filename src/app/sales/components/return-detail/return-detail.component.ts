import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Return } from '../../../core/api';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import StatusEnum = Return.StatusEnum;
import { ReturnsActions } from '../../store';

@Component({
  selector: 'app-return-detail',
  templateUrl: './return-detail.component.html',
  styleUrls: ['./return-detail.component.scss'],
})
export class ReturnDetailComponent implements OnInit {
  @Input() return!: Return;

  @Output() cancel = new EventEmitter<void>();

  editForm = new FormGroup({
    status: new FormControl<StatusEnum>('open', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    message: new FormControl<string>('', {
      nonNullable: true,
    }),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.resetValues();
  }

  resetValues() {
    this.editForm.patchValue({
      status: this.return.status,
      message: this.return.message,
    });
  }

  save() {
    this.store.dispatch(
      ReturnsActions.updateReturn({
        returnId: this.return.id,
        data: {
          ...this.editForm.getRawValue(),
        },
      }),
    );
  }
}
