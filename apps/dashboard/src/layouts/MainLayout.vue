<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      elevated
      class="bg-primary"
    >
      <q-toolbar>
        <div class="text-weight-bold">
          Sentiment Analysis v1.0
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      bordered
      :mini="minimizedDrawer"
      class="bg-secondary"
      @mouseover="minimizedDrawer = false"
      @mouseout="minimizedDrawer = true"
    >
      <q-list>
        <q-item-label
          header
          class="text-primary text-weight-bold"
        >
          Menu
        </q-item-label>

        <div>
          <q-item
            v-for="item in MENU"
            :key="item.title"
            clickable
            tag="a"
            :href="item.link"
            class="text-primary text-weigh"
          >
            <q-item-section>
              <q-item-label>{{ item.title }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon :name="item.icon" />
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const MENU = [
  {
    title: 'Home',
    icon: 'home',
    link: '/',
  },
  {
    title: 'Data Feeder',
    icon: 'upload',
    link: '/#/data-feeder',
  },
  {
    title: 'Data Viewer',
    icon: 'storage',
    link: '/#/data-viewer',
  },
]

const drawer = ref(false)
const minimizedDrawer = ref(true)
function toggleDrawer() {
  drawer.value = !drawer.value
}
</script>
