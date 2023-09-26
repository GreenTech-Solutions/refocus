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
    name: 'Петров Петр',
    position: 'Директор супермаркета',
    phone: '+7920234567',
    email: 'director@mail.ru',
    city: 'Все',
  });
  watchers.items.add({
    name: 'Петров Петр',
    position: 'директор супермаркета',
    phone: '+7920234567',
    email: 'director@mail.ru',
    city: 'Все',
  });
  watchers.items.add({
    name: 'Сидоров Сергей',
    position: 'директор супермаркета',
    phone: '+79101234567',
    email: 'manager@mail.ru',
    city: 'Москва',
  });
  watchers.items.add({
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
</script>

<template>
  <div class="wrapper">
    <Table :title="watchers.title" :description="watchers.description" :items="watchers.items" />
  </div>
</template>

<style scoped>
  .wrapper {
    padding: 20px 100px;
  }
</style>
