<template>
  <q-input
    v-model="search"
    dark
    dense
    filled
    input-class="text-right"
    class="q-ml-md"
    placeholder="Nazwisko"
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
</template>

<script>
export default {
  data () {
    return {
      search: ''
    }
  },
  methods: {
    searchName () {
      if (this.search)
        this.$router.push(`/search-show/${this.search}?${Date.now()}`)
      this.search = ''
    }
  },

}
</script>

<style>
</style>
