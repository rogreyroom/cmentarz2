/* eslint-disable prettier/prettier */
<template>
  <q-layout
    class="bg-white"
    view="hHh Lpr lFf"
  >
    <q-header class="bg-grey-10">
      <q-toolbar>
        <q-btn
          round
          flat
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title class="logo">
          <svg
            class="app-icon"
            width="100%"
            height="100%"
            viewBox="0 0 450 400"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xml:space="preserve"
            xmlns:serif="http://www.serif.com/"
            style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;"
          >
            <g transform="matrix(1,0,0,1,-25,-50)">
              <path
                class="app-icon__path"
                d="M32.5,442.5L467.5,442.5"
                style="fill:none;fill-rule:nonzero;stroke-width:12px;"
              />
              <path
                class="app-icon__path"
                d="M382.5,190L382.5,442.5L117.5,442.5L117.5,190C117.5,116.822 176.822,57.5 250,57.5C323.178,57.5 382.5,116.822 382.5,190ZM370.5,430.5L370.5,190C370.5,123.449 316.551,69.5 250,69.5C183.449,69.5 129.5,123.449 129.5,190L129.5,430.5L370.5,430.5Z"
              />
              <path
                class="app-icon__path"
                d="M315,173.043L185,173.043"
                style="fill:none;fill-rule:nonzero;stroke-width:12px;"
              />
              <path
                class="app-icon__path"
                d="M253,96.957L253,326.957"
                style="fill:none;fill-rule:nonzero;stroke-width:12px;"
              />
              <g transform="matrix(0.436997,-0.899463,0.867277,0.497826,387,447.203)">
                <path
                  class="app-icon__path"
                  d="M7.5,-7.5L152.79,-7.5"
                  style="fill:none;fill-rule:nonzero;stroke-width:12.44px;"
                />
              </g>
              <g transform="matrix(0.787512,-0.6163,0.552227,0.833694,390,445.374)">
                <path
                  class="app-icon__path"
                  d="M7.5,-7.5L74.941,-7.5"
                  style="fill:none;fill-rule:nonzero;stroke-width:12.5px;"
                />
              </g>
              <g transform="matrix(-0.787512,-0.6163,-0.552227,0.833694,109.923,447.548)">
                <path
                  class="app-icon__path"
                  d="M7.5,-7.5L74.941,-7.5"
                  style="fill:none;fill-rule:nonzero;stroke-width:12.5px;"
                />
              </g>
              <g transform="matrix(-0.436997,-0.899463,-0.867277,0.497826,114.93,447.435)">
                <path
                  class="app-icon__path"
                  d="M7.5,-7.5L152.79,-6.48"
                  style="fill:none;fill-rule:nonzero;stroke-width:12.44px;"
                />
              </g>
            </g>
          </svg>
          Cmentarz
        </q-toolbar-title>
        <search-input />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      :width="200"
      :breakpoint="500"
      content-class="bg-grey-2"
    >
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
      <div class="drower-footer text-center">
        <a
          class="text-center drower-footer__link"
          href="mailto:contact@adamczewski.me?subject=Cmentarz - informacje"
        >
          Robert Adamczewski
        </a>
      </div>
    </q-drawer>
    <q-page-container id="scrollTop">
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view />
      </transition>
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
.logo {
  display: flex;
}
.app-icon {
  width: 32px;
  height: 32px;
  margin-right: 1rem;

  &__path {
    fill: white;
    stroke: white;
  }
}
.drower-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding: 4px;
  font-weight: 300;

  &__link {
    text-decoration: none;
    color: $grey-6;

    &:hover {
      color: $indigo-10;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
