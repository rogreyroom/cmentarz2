<template>
  <div>
    <search-view
      v-if="foundUsers.length > 0"
      :result="foundUsers"
    />
    <h1
      v-else
      class="absolute-center text-center search-info"
    >
      Nie znaleziono wyników wyszukiwania!
    </h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Search from '../../components/Views/Search'

export default {
  components: {
    'search-view': Search
  },
  props: {
    query: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      foundUsers: []
    }
  },
  computed: {
    ...mapGetters({ getUsersByName: "cm/GET_USERS_BY_NAME" }),
  },
  watch: {
    '$route' (to, from) {
      if (to !== from)
        this.foundUsers = this.getUsersByName(this.query)
    }
  },
  mounted () {
    this.foundUsers = this.getUsersByName(this.query)
  }
}
</script>

<style lang="scss" scoped>
.search-info {
  margin: 0;
  font-size: 1.8rem;
  font-weight: bolder;
  color: $blue-grey-10;
}
</style>
