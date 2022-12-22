import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface CheckboxTreeItem<T = string> {
  name: string;
  value: T;
  selected?: boolean;
  disabled?: boolean;
  dependencies?: T[];
  children?: CheckboxTreeItem<T>[];
}

export const getCheckboxTreeValues = <T>(tree: CheckboxTreeItem<T>[]): T[] => {
  const values: T[] = [];
  tree.forEach((item) => {
    if (item.selected) {
      values.push(item.value);
    }
    if (item.children) {
      values.push(...getCheckboxTreeValues(item.children));
    }
  });
  return values;
};

@Component({
  selector: 'app-checkbox-tree',
  templateUrl: './checkbox-tree.component.html',
  styleUrls: ['./checkbox-tree.component.scss'],
})
export class CheckboxTreeComponent implements OnInit {
  @Input() tree: CheckboxTreeItem<any>[] = [];
  @Input() child: boolean = false;

  @Output() updated: EventEmitter<CheckboxTreeItem> =
    new EventEmitter<CheckboxTreeItem>();

  constructor() {}

  ngOnInit() {
    this.calculateDisabled();
    this.calculateParents();
  }

  update(item: CheckboxTreeItem) {
    if (!this.child) {
      this.setChildren(item);
      this.calculateDisabled();
      this.calculateParents();
    } else {
      this.updated.emit(item);
    }
  }

  getAllItems(items: CheckboxTreeItem[]): CheckboxTreeItem[] {
    return items.reduce((acc, item) => {
      acc.push(item);
      if (item.children) {
        acc.push(...this.getAllItems(item.children));
      }
      return acc;
    }, [] as CheckboxTreeItem[]);
  }

  calculateDisabled() {
    const allItems = this.getAllItems(this.tree);
    for (const item of allItems) {
      if (item.dependencies) {
        item.disabled = item.dependencies.some(
          (d) => !allItems.find((i) => i.value === d)?.selected,
        );
      }
      if (item.disabled && item.selected) {
        item.selected = false;
      }
    }
  }

  calculateParents() {
    const allItems = this.getAllItems(this.tree);
    for (const item of allItems) {
      if (item.children) {
        const countSelected = item.children.filter((i) => i.selected).length;
        if (countSelected >= item.children.length / 2) {
          item.selected = true;
        }
        if (countSelected < item.children.length / 2) {
          item.selected = false;
        }
      }
    }
  }

  setChildren(item: CheckboxTreeItem) {
    if (item.children) {
      for (const child of item.children) {
        child.selected = item.selected;
        this.setChildren(child);
      }
    }
  }

  indeterminate(item: CheckboxTreeItem) {
    if (item.children) {
      const countSelected = item.children.filter((i) => i.selected).length;
      return countSelected > 0 && countSelected < item.children.length;
    }
    return false;
  }
}
