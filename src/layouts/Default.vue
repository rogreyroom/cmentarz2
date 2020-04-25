/* eslint-disable prettier/prettier */
<template>
  <q-layout view="hHh Lpr lFf">
    <q-header class="bg-grey-10">
      <q-toolbar>
        <q-btn
          round
          flat
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Cmentarz
        </q-toolbar-title>

        <search-input />

      </q-toolbar>
    </q-header>
    <!--   flat dense round -->

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      :width="200"
      :breakpoint="500"
      content-class="bg-grey-2"
    >
      <!-- <q-scroll-area class="fit"> -->
      <q-list
        v-for="(menuItem, index) in menuList"
        :key="index"
      >
        <q-item
          v-ripple
          clickable
          :active="menuItem.label === 'Outbox'"
          :to="{ name: menuItem.link }"
        >
          <q-item-section avatar>
            <q-icon
              :name="menuItem.icon"
              :color="menuItem.iconColor"
              round
            />
          </q-item-section>
          <q-item-section>
            <span :class="menuItem.class">{{ menuItem.label }}</span>
          </q-item-section>
        </q-item>

        <q-separator v-if="menuItem.separator" />
      </q-list>
      <!-- </q-scroll-area> -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
const menuList = [
  {
    icon: "home",
    iconColor: "indigo-9",
    label: "Wszystkie groby",
    class: "text-indigo-9",
    separator: false,
    link: "home"
  },
  {
    icon: "map",
    iconColor: "indigo-9",
    label: "Mapa cmentarza",
    class: "text-indigo-9",
    separator: true,
    link: "cemeteries"
  },
  {
    icon: "add",
    iconColor: "green-9",
    label: "Dodaj cmentarz",
    class: "text-green-9",
    separator: false,
    link: "cemetery-add-edit"
  },
  {
    icon: "add",
    iconColor: "green-9",
    label: "Dodaj grób",
    class: "text-green-9",
    separator: true,
    link: "grave-add-edit"
  },
  {
    icon: "view_list",
    iconColor: "deep-purple-9",
    label: "Lista cmentarzy",
    class: "text-deep-purple-9",
    separator: false,
    link: "cemetery-full-list"
  },
  {
    icon: "view_list",
    iconColor: "deep-purple-9",
    label: "Pełna lista",
    class: "text-deep-purple-9",
    separator: false,
    link: "graves-full-list"
  },
  {
    icon: "view_list",
    iconColor: "deep-purple-9",
    label: "Nie opłacone",
    class: "text-deep-purple-9",
    separator: false,
    link: "unpaid-list"
  },
  {
    icon: "view_list",
    iconColor: "deep-purple-9",
    label: "Zmarli w roku",
    class: "text-deep-purple-9",
    separator: false,
    link: "dead-list"
  }
];

import Search from '../components/Forms/Search'

export default {
  name: "MyLayout",
  components: {
    'search-input': Search
  },
  data () {
    return {
      leftDrawerOpen: false,
      menuList,
    };
  }
};
</script>

<style lang="scss" scoped>
.blue {
  color: $indigo-9;
}

.green {
  color: $green;
}

.purple {
  color: $deep-purple-9;
}
</style>
