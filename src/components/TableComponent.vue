<script lang="ts" setup>
  import { TableItems } from '@/classes';
  import PersonIcon from '@/assets/icons/person-icon.svg';
  import SortIcon from '@/assets/icons/sort-icon.svg';
  import DotsIcon from '@/assets/icons/dots-icon.svg';
  import InfoIcon from '@/assets/icons/info-icon.svg';
  import CloseIcon from '@/assets/icons/close-icon.svg';
  import EyeOpen from '@/assets/icons/eye-open.svg';
  import EyeClose from '@/assets/icons/eye-close.svg';
  import { Ref, ref } from 'vue';

  interface ITableHeadCellOptions {
    text?: string;
    show?: boolean;
    image?: boolean;
    sortable?: boolean;
  }

  class TableHeadCell implements ITableHeadCellOptions {
    text?: string;
    show?: boolean;
    image?: boolean;
    sortable?: boolean;

    constructor(options: ITableHeadCellOptions) {
      this.text = options.text ?? '';
      this.show = options.show ?? true;
      this.image = options.image ?? false;
      this.sortable = options.sortable ?? false;
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

  const headCells: TableHeadCells = new TableHeadCells([
    new TableHeadCell({
      image: true,
    }),
    new TableHeadCell({ text: 'Фамилия и имя', sortable: true }),
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

  const items = ref(props.items);

  const currentOpenDots = ref();

  const isContextVisible: Ref<boolean[]> = ref(Array(items.value.length).fill(false));

  const isInfoVisible = ref(false);
  function onSortClick() {
    items.value.sort();
  }

  function onDotsClick(event: MouseEvent, index: number) {
    event.stopPropagation();
    if (index !== currentOpenDots.value) {
      isContextVisible.value[currentOpenDots.value] = false;
    }
    isContextVisible.value[index] = !isContextVisible.value[index];
    currentOpenDots.value = index;
  }

  function onInfoClick() {
    isInfoVisible.value = !isInfoVisible.value;
  }

  function handleDocumentClick(event: MouseEvent) {
    const target: HTMLElement = event.target as HTMLElement;

    if (!target.classList.contains('table__menu')) {
      isContextVisible.value[currentOpenDots.value] = false;
    }
  }

  document.addEventListener('click', handleDocumentClick);
</script>

<template>
  <div class="table__wrapper">
    <div class="table">
      <div class="table__header">
        <div class="table__title">{{ $props.title }}</div>
        <div class="table__description">{{ $props.description }}</div>
      </div>
      <table class="table__content">
        <thead class="table__head">
          <th class="table__head-cell" v-for="(headCell, index) in headCells.get()" :key="index">
            <PersonIcon v-if="headCell.image" class="table__icon" />

            <div v-if="!headCell.image && !headCell.text?.startsWith('Видимость')" class="table__head-content">
              <div>{{ headCell.text }}</div>
              <SortIcon v-if="headCell.sortable" class="table__button table__icon" @click="onSortClick" />
            </div>
            <div v-if="headCell.text?.startsWith('Видимость')" class="table__head-content">
              <span>{{ headCell.text }}</span>
              <InfoIcon class="table__icon table__button" @click="onInfoClick" />
              <transition name="fade" mode="in-out">
                <div class="table__info" v-show="isInfoVisible">
                  Показывает пользователей, которые видны участникам в чате и которым можно написать сообщение.<br />
                  Остальным пользователям участник может написать, только если они впервые начали диалог
                  <CloseIcon class="table__icon table__button table__info-close" @click="onInfoClick" />
                </div>
              </transition>
            </div>
          </th>
        </thead>
        <tbody class="table__body">
          <tr v-for="(item, index) in items.get()" :key="index" class="table__row">
            <td class="table__cell table__cell_centered">
              <PersonIcon v-if="!item.avatar" class="table__icon" />
              <img v-else :src="item.avatar" class="table__icon table__avatar" />
            </td>
            <td class="table__cell">
              <div class="table__cell-info">
                <span>{{ item.name }}</span>
                <span>{{ item.position }}</span>
              </div>
            </td>
            <td class="table__cell table__cell_centered table__cell_narrow" v-if="$props.visibility">
              <EyeOpen v-if="item.visibility" class="table__icon_big table__button" />
              <EyeClose v-else class="table__icon_big table__button" />
            </td>
            <td class="table__cell">{{ item.phone }}</td>
            <td class="table__cell">{{ item.email }}</td>
            <td class="table__cell">
              <div class="table__cell_inner">
                {{ item.city }}
                <DotsIcon
                  :id="`dots-${index}`"
                  class="table__icon_big table__button"
                  @click="onDotsClick($event, index)" />
                <transition name="fade" mode="in-out">
                  <div v-show="isContextVisible[index]" class="table__menu" :id="`menu-${index}`">
                    <span class="table__menu-item">Редактировать</span>
                    <span class="table__menu-item">Удалить</span>
                  </div>
                </transition>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .table {
    display: table;
    border-collapse: collapse;
    width: 100%;
    font-size: 14px;

    &__wrapper {
      overflow-x: auto;
    }

    &__header {
      color: $textColorHighlited;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding-bottom: 15px;
    }

    &__title {
      font-size: 15px;
      font-weight: bold;
    }

    &__icon {
      min-width: 15px;
      height: 15px;

      &_big {
        min-width: 25px;
        height: 25px;
      }
    }

    &__avatar {
      border-radius: 50%;
      width: 30px;
      height: 30px;
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
        position: relative;

        padding: 10px;

        border: 1px solid #80808050;
        vertical-align: middle;

        &:first-child {
          text-align: center;
        }
      }

      &-content {
        display: flex;
        justify-content: space-between;
        gap: 5px;
      }
    }

    &__button {
      cursor: pointer;

      transition: 0.3s;
      &:hover {
        transform: scale(1.1);
      }
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
      text-align: left;
      position: relative;

      &_inner {
        display: flex;
        justify-content: space-between;
      }

      &_centered {
        text-align: center;
        vertical-align: middle;
      }

      &_narrow {
        width: 100px;
      }

      &-info {
        display: flex;
        flex-direction: column;
      }
    }

    &__menu,
    &__info {
      border: 1px solid $textColorHighlited;
      border-radius: 12px;
      padding: 10px 15px;

      gap: 5px;
      font-size: 12px;

      display: flex;
      flex-direction: column;

      position: absolute;
      right: 30px;
      background-color: #fff;

      z-index: 2;

      user-select: none;

      &-item {
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          scale: 1.01;
        }
      }
    }

    &__info {
      width: 240px;
      font-size: 12px;

      &-close {
        position: absolute;
        right: 5px;
        top: 5px;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
