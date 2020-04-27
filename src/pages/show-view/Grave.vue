<template>
  <div>
    <q-page padding>
      <grave
        :id="id"
        :grave="graveData"
        :cemetery="cmFullName"
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
        @render-users="renderUsers"
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
      usersData: [],
      cmFullName: ''
    };
  },
  computed: {
    ...mapGetters({ getGrave: "cm/GET_GRAVE" }),
    ...mapGetters({ getTaker: "cm/GET_GRAVE_TAKER" }),
    ...mapGetters({ getUsers: "cm/GET_GRAVE_USERS" }),
    ...mapGetters({ getCemetery: "cm/GET_PARCELA" }),
  },
  mounted () {
    const { parcela } = this.getGrave(this.id)[0]
    this.graveData = parcela
    const { thecm: { cmFullName } } = this.getCemetery(parcela.parcela)
    this.cmFullName = cmFullName
    const { taker } = this.getTaker(this.id)[0]
    this.takerData = taker
    this.usersData = this.getUsers(this.id)
  },
  methods: {
    renderUsers () {
      this.usersData = this.getUsers(this.id)
    }
  },
};
</script>
