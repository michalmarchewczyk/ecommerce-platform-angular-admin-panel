import { Component } from '@angular/core';
import { ExportDto } from '../../../core/api';
import DataEnum = ExportDto.DataEnum;
import {
  CheckboxTreeItem,
  getCheckboxTreeValues,
} from '../../../shared/components/checkbox-tree/checkbox-tree.component';
import FormatEnum = ExportDto.FormatEnum;
import { ImportExportService } from '../../services/import-export.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
})
export class ExportComponent {
  dataToExport: CheckboxTreeItem<DataEnum | null>[] = [
    {
      name: 'Settings',
      value: DataEnum.Settings,
    },
    {
      name: 'Pages',
      value: DataEnum.Pages,
    },
    {
      name: 'Users',
      value: DataEnum.Users,
    },
    {
      name: 'Catalog',
      value: null,
      children: [
        {
          name: 'Attribute types',
          value: DataEnum.AttributeTypes,
        },
        {
          name: 'Products',
          value: DataEnum.Products,
          dependencies: [DataEnum.AttributeTypes],
        },
        {
          name: 'Product photos',
          value: DataEnum.ProductPhotos,
          dependencies: [DataEnum.Products],
        },
        {
          name: 'Categories',
          value: DataEnum.Categories,
          dependencies: [DataEnum.Products],
        },
      ],
    },
    {
      name: 'Wishlists',
      value: DataEnum.Wishlists,
      dependencies: [DataEnum.Users, DataEnum.Products],
    },
    {
      name: 'Sales',
      value: null,
      children: [
        {
          name: 'Delivery methods',
          value: DataEnum.DeliveryMethods,
        },
        {
          name: 'Payment methods',
          value: DataEnum.PaymentMethods,
        },
        {
          name: 'Orders',
          value: DataEnum.Orders,
          dependencies: [
            DataEnum.Users,
            DataEnum.Products,
            DataEnum.DeliveryMethods,
            DataEnum.PaymentMethods,
          ],
        },
        {
          name: 'Returns',
          value: DataEnum.Returns,
          dependencies: [DataEnum.Orders],
        },
      ],
    },
  ];

  format: FormatEnum = FormatEnum.Json;
  formatValues = Object.values(FormatEnum);

  constructor(private importExportService: ImportExportService) {}

  async submit() {
    const values: DataEnum[] = getCheckboxTreeValues(this.dataToExport).filter(
      (v): v is DataEnum => v !== null,
    );
    await this.importExportService.export(values, this.format);
  }
}
