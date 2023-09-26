import { ITableItem } from '@/interfaces';

enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class TableItems {
  items: ITableItem[] = [];

  sortOrder: SortOrder = SortOrder.ASC;

  length = 0;

  add(item: ITableItem) {
    const _item: ITableItem = {} as ITableItem;
    _item.avatar = item.avatar ?? '';
    _item.position = item.position ?? '';
    _item.name = item.name ?? '';
    _item.phone = item.phone ?? '';
    _item.email = item.email ?? '';
    _item.city = item.city ?? '';
    _item.visibility = item.visibility ?? false;
    this.items.push(_item);
    this.length++;
  }

  get() {
    return this.items;
  }

  sort() {
    this.items.sort((a, b) => a.name.localeCompare(b.name));
    if (this.sortOrder === SortOrder.DESC) {
      this.items.reverse();
    }
    this.sortOrder = this.sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
  }
}
