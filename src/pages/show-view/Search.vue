<template>
  <div>
    <search-view
      v-if="foundUsers.length > 0"
      :result="foundUsers"
    />
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

<style>
</style>
