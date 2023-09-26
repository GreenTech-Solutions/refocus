import { ITableItem } from '@/interfaces';

export class TableItems {
  items: ITableItem[] = [];

  add(item: ITableItem) {
    const _item: ITableItem = {} as ITableItem;
    _item.avatar = item.avatar ?? '';
    _item.position = item.position ?? '';
    _item.name = item.name ?? '';
    _item.phone = item.phone ?? '';
    _item.email = item.email ?? '';
    _item.city = item.city ?? '';
    this.items.push(_item);
  }

  get() {
    return this.items;
  }
}
