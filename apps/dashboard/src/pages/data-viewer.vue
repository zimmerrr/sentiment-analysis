<template>
  <q-page class="flex flex-center">
    <div class="text-header text-primary text-weight-bold text-center q-mb-md">
      Sentiment Analysis Data Viewer

      <q-table
        :rows="localStorageData"
        :columns="columns"
        row-key="name"
        flat
        square
        :rows-per-page-options="[10]"
      />
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { LocalStorage } from 'quasar'
const localStorageData = LocalStorage.getItem('data') || []

console.log(localStorageData)
const columns = [
  {
    name: 'date_created',
    required: true,
    label: 'Date Created',
    align: 'left',
    field: localStorageData => localStorageData.dateCreated,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Input',
    align: 'left',
    field: localStorageData => localStorageData.input,
    format: val => `${val}`,
    sortable: true,
  },
  {
    name: 'value',
    required: true,
    label: 'Category',
    align: 'left',
    field: localStorageData => localStorageData.category,
    format: val => `${val}`,
    sortable: true,
  },
]

</script>
<style lang="sass" scoped>
.q-table__container
  width: 100% !important
  height: 70vh
.text-header
  font-size: 4vw !important
</style>
