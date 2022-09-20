import { Component, Input } from '@angular/core';
import { Order } from '../../../core/api';
import { ReturnAddDialogComponent } from '../return-add-dialog/return-add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent {
  @Input() order: Order | null = null;

  constructor(private dialog: MatDialog, private router: Router) {}

  addReturn() {
    const dialogRef = this.dialog.open(ReturnAddDialogComponent, {
      data: {
        orderId: this.order?.id,
      },
      width: '360px',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.router.navigate(['/sales/returns']);
      }
    });
  }
}
