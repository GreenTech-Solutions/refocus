<script lang="ts" setup>
  import { TableItems } from '@/classes';
  import PersonIcon from '@/assets/icons/person-icon.svg';

  interface ITableHeadCellOptions {
    text?: string;
    show?: boolean;
    image?: boolean;
  }

  class TableHeadCell {
    text?: string;
    show?: boolean;
    image?: boolean;

    constructor(options: ITableHeadCellOptions) {
      this.text = options.text ?? '';
      this.show = options.show ?? true;
      this.image = options.image ?? false;
    }
  }

  class TableHeadCells {
    headCells: TableHeadCell[] = [];

    constructor(headCells: TableHeadCell[]) {
      this.headCells = headCells;
    }

    get() {
      return this.headCells.filter((headCell) => headCell.show);
    }
  }

  const props = defineProps({
    title: String,
    description: String,
    items: {
      type: TableItems,
      required: true,
    },
    visibility: {
      type: Boolean,
      default: false,
      required: false,
    },
  });

  console.log('🚀 ------------------------------------------------🚀');
  console.log('🚀 ~ file: TableComponent.vue:49 ~ props:', props.items);
  console.log('🚀 ------------------------------------------------🚀');

  const headCells: TableHeadCells = new TableHeadCells([
    new TableHeadCell({
      image: true,
    }),
    new TableHeadCell({ text: 'Фамилия и имя' }),
    new TableHeadCell({
      text: 'Видимость в чате участников',
      show: props.visibility,
    }),
    new TableHeadCell({
      text: 'Телефон',
    }),
    new TableHeadCell({
      text: 'Email',
    }),
    new TableHeadCell({
      text: 'Города',
    }),
  ]);

  console.log('🚀 --------------------------------------------------------🚀');
  console.log('🚀 ~ file: TableComponent.vue:43 ~ headCells:', headCells);
  console.log('🚀 --------------------------------------------------------🚀');
</script>

<template>
  <div class="table">
    <div class="table__header">
      <div class="table__title">{{ $props.title }}</div>
      <div class="table__description">{{ $props.description }}</div>
    </div>
    <table class="table__content">
      <thead class="table__head">
        <th class="table__head-cell" v-for="(headCell, index) in headCells.get()" :key="index">
          <PersonIcon v-if="headCell.image && headCell.show" class="table__icon" />
          <div v-if="headCell.show">{{ headCell.text }}</div>
        </th>
      </thead>
      <tbody class="table__body">
        <tr v-for="(item, index) in $props.items.get()" :key="index" class="table__row">
          <td class="table__cell table__cell_centered">
            <PersonIcon v-if="!item.avatar" class="table__icon" /> <img :src="item.avatar" v-if="item.avatar" />
          </td>
          <td class="table__cell">
            <div class="table__cell-name">
              <span>{{ item.name }}</span>
              <span>{{ item.position }}</span>
            </div>
          </td>
          <td class="table__cell">{{ item.phone }}</td>
          <td class="table__cell">{{ item.email }}</td>
          <td class="table__cell">{{ item.city }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped>
  .table {
    display: table;
    border-collapse: collapse;
    width: 100%;

    &__header {
      color: $textColorHighlited;
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding-bottom: 10px;
    }

    &__title {
      font-size: 15px;
      font-weight: bold;
    }

    &__description {
    }

    &__icon {
      width: 20px;
      height: 20px;
    }

    &__content {
      width: 100%;
    }

    &__head {
      border: 1px solid #80808050;
      font-weight: bold;
      color: $textColorHighlited;
      background-color: #f2f2f2;
      text-align: left;

      display: table-header-group;

      &-cell {
        display: table-cell;

        padding: 10px;

        border: 1px solid #80808050;
        vertical-align: middle;

        &:first-child {
          text-align: center;
        }
      }
    }

    &__body {
    }

    &__row {
      &:nth-child(odd) {
        background-color: #ffffff;
      }
      &:nth-child(even) {
        background-color: #f2f2f2;
      }
    }

    &__cell {
      border-left: 1px solid #80808050;
      padding: 10px 10px;
      display: table-cell;
      // vertical-align: middle;
      text-align: left;

      &_centered {
        text-align: center;
        vertical-align: middle;
      }

      &-name {
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>
