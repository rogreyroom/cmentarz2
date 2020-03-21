<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
  </q-page>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  // name: "PageIndex",
  computed: {
    ...mapState("cm", ["graves"]),
    ...mapState("cm", ["cemeteries"]),
    ...mapState("cm", ["users"]),
    ...mapState("cm", ["takers"])
  },
  created () {
    this["FETCH_GRAVES"]();
    this["FETCH_CEMETERIES"]();
    this["FETCH_USERS"]();
    this["FETCH_TAKERS"]();
  },
  methods: {
    ...mapActions("cm", ["FETCH_GRAVES"]),
    ...mapActions("cm", ["FETCH_CEMETERIES"]),
    ...mapActions("cm", ["FETCH_USERS"]),
    ...mapActions("cm", ["FETCH_TAKERS"])
  }
};
</script>
