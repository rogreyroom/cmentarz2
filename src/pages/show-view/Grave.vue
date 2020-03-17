<template>
  <div class="q-pa-md">
    <q-page padding>
      <grave
        :id="id"
        :grave="graveData"
      />
      <hr>
      <taker
        :id="id"
        :taker="takerData"
      />
      <hr>
      <user
        :id="id"
        :users="usersData"
      />
      <hr>
    </q-page>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Grave from '../../components/Views/Grave'
import User from '../../components/Views/User'
import Taker from '../../components/Views/Taker'

export default {
  components: {
    'grave': Grave,
    'user': User,
    'taker': Taker
  },
  props: {
    id: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      graveData: {},
      takerData: {},
      usersData: []
    };
  },
  computed: {
    ...mapGetters({ grave: "cm/GET_GRAVE" }),
    ...mapGetters({ taker: "cm/GET_GRAVE_TAKER" }),
    ...mapGetters({ users: "cm/GET_GRAVE_USERS" }),
  },
  mounted () {
    const { parcela } = this.grave(this.id)[0]
    this.graveData = parcela

    const { taker } = this.taker(this.id)[0]
    this.takerData = taker

    this.usersData = this.users(this.id)
  }
};
</script>
