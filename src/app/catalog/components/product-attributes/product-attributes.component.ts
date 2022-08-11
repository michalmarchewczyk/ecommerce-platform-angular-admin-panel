import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AttributeDto, Product } from '../../../core/api';
import { ProductsActions } from '../../store';

@Component({
  selector: 'app-product-attributes',
  templateUrl: './product-attributes.component.html',
  styleUrls: ['./product-attributes.component.scss'],
})
export class ProductAttributesComponent implements OnInit, OnChanges {
  @Input() product: Product | null = null;
  attributesToSave: (AttributeDto & { id: number })[] = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.updateAttributesToSave();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product']) {
      this.updateAttributesToSave();
    }
  }

  updateAttributesToSave() {
    this.attributesToSave =
      this.product?.attributes.map((a) => ({
        value: a.value,
        typeId: a.type.id,
        id: a.id,
      })) ?? [];
  }

  onAdd(attributeDto: AttributeDto & { id: number }) {
    this.attributesToSave.push(attributeDto);
    this.saveAttributes();
  }

  onUpdate(id: number, value: string) {
    this.attributesToSave = this.attributesToSave.map((a) => {
      if (a.id === id) {
        a.value = value;
      }
      return a;
    });
    this.saveAttributes();
  }

  onDelete(id: number) {
    this.attributesToSave = this.attributesToSave.filter((a) => a.id !== id);
    this.saveAttributes();
  }

  saveAttributes() {
    if (!this.product) {
      return;
    }
    this.store.dispatch(
      ProductsActions.updateProductAttributes({
        id: this.product.id,
        data: this.attributesToSave,
      }),
    );
  }
}
