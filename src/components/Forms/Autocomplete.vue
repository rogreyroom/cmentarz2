<template>
  <div class="autocomplete bg-grey-10">
    <q-input
      v-model="search"
      dark
      dense
      filled
      input-class="text-right"
      placeholder="Nazwisko"
      @input="onInputChange"
      @keydown.enter.prevent="searchName"
    >
      <template v-slot:append>
        <q-icon
          v-if="search === ''"
          name="search"
        />
        <q-icon
          v-else
          name="clear"
          class="cursor-pointer"
          @click="search = ''"
        />
      </template>
    </q-input>
    <q-list
      v-show="isOpen"
      hightlight
      class="slide-right hint-list"
    >
      <q-item
        v-for="(user, index) in matches"
        :key="index"
        dark
        dense
        class="bg-grey-10 text-center vertical-middle cursor-pointer"
        clickable
        @click="hintClickEnter(user)"
        @keydown.enter.prevent="hintClickEnter(user)"
      >
        {{ user }}
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      search: "",
      usersList: [],
      isOpen: false,
    };
  },
  computed: {
    ...mapState("cm", ["users"]),
    matches() {
      return this.usersList.filter(user => {
        return user.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    ...mapActions("cm", ["FETCH_USERS"]),

    async getUsers () {
      await this["FETCH_USERS"]()
        const surnames = await this.users.map(({ user }) => user.nazwisko);
      this.usersList = await surnames.filter((surname, index) => {
        if (typeof surname !== "undefined" && surnames.indexOf(surname) === index) return surname;
      });
    },

    searchName() {
      if (this.search) this.$router.push(`/search-show/${this.search}?${Date.now()}`);
      this.search = "";
      this.isOpen = false;
    },

    hintClickEnter(surname) {
      this.search = surname;
      this.isOpen = false;
      this.searchName();
    },

    onInputChange() {
      this.isOpen = true;
    },
  }
};
</script>
<style lang="scss" scoped>
.autocomplete {
  width: 220px;
}

.hint-list {
  position: absolute;
  top: 3rem;
  width: 220px;
  padding: 0;
  margin: 0;
}
</style>
