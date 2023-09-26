<script setup lang="ts">
  import { Table } from '@/components';
  import { ITable } from '@interfaces';
  import { TableItems } from '@/classes';

  const watchers: ITable = {
    title: 'Наблюдатели',
    description: 'Наблюдатель может просматривать активности, список участников, оставлять комментари модератору',
    items: new TableItems(),
  };

  watchers.items.add({
    avatar: 'https://randomuser.me/api/portraits/men/73.jpg',
    name: 'Петров Петр',
    position: 'директор супермаркета',
    phone: '+7920234567',
    email: 'director@mail.ru',
    city: 'Все',
  });
  watchers.items.add({
    avatar: 'https://randomuser.me/api/portraits/men/30.jpg',
    name: 'Сидоров Сергей',
    position: 'директор супермаркета',
    phone: '+79101234567',
    email: 'manager@mail.ru',
    city: 'Москва',
  });
  watchers.items.add({
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    name: 'Павлов Иван',
    position: 'менеджер отдела маркетинга',
    phone: '+79173456789',
    email: 'marketing@mail.ru',
    city: 'Калуга',
  });
  watchers.items.add({
    name: 'Семенов Семен',
    position: 'диретор филиала',
    phone: '+79161234567',
    email: 'manager2@mail.ru',
    city: 'Москва, Ярославль',
  });
  watchers.items.add({
    name: 'Тимофеев Сергей Анатольевич',
    position: 'руководитель клиентской службы',
    phone: '+79103456789',
    email: 'filial@mail.ru',
    city: 'Санкт-петербург',
  });

  const moderators: ITable = {
    title: 'Модераторы',
    description: 'Модератор может создавать и запускать активности, взаимодействовать с участниками.',
    items: new TableItems(),
  };

  moderators.items.add({
    avatar: 'https://randomuser.me/api/portraits/women/48.jpg',
    name: 'Панченко Юлия',
    position: 'социс',
    phone: '+7920234567',
    email: 'director@mail.ru',
    city: 'Все',
    visibility: true,
  });
  moderators.items.add({
    avatar: 'https://randomuser.me/api/portraits/men/74.jpg',
    name: 'Оглоблин Роман',
    position: 'Refocus',
    phone: '+79101234567',
    email: 'manager@mail.ru',
    city: 'Все',
    visibility: true,
  });
  moderators.items.add({
    name: 'Иванов Иван',
    position: 'Директор по маркетингу',
    phone: '+79173456789',
    email: 'marketing@mail.ru',
    city: 'Калуга',
  });
</script>

<template>
  <div class="wrapper">
    <Table :title="watchers.title" :description="watchers.description" :items="watchers.items" />
    <Table
      :title="moderators.title"
      :description="moderators.description"
      :items="moderators.items"
      :visibility="true" />
  </div>
</template>

<style scoped>
  .wrapper {
    padding: 20px 100px;
  }
</style>
