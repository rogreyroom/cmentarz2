<template>
  <div class="q-pa-md">
    <q-page padding>
      <!-- Grave view component -->
      <grave
        graveId="id"
        :grave="graveData"
      />
      <hr>
      <!-- Grave taker -->
      <div class="row q-pa-sm q-gutter-sm">
        <h5>
          Dane opiekuna grobu
        </h5>
        <q-btn
          :to="{ name: 'grave-edit', params: {id: id} }"
          flat
          icon="edit"
          class="q-ml-md"
          text-color="light-blue-13"
        />
      </div>
      <div class="row q-pa-sm q-gutter-sm">
        <div class="col">
          <p><strong>Imię:</strong> {{ takerData.imie }}</p>
          <p><strong>Nazwisko:</strong> {{ takerData.nazwisko }}</p>
          <p><strong>Telefon:</strong> {{ takerData.tel }}</p>
          <p><strong>Email:</strong> {{ takerData.email }}</p>
        </div>
        <div class="col">
          <p><strong>Adres:</strong> {{ takerData.adres }}</p>
          <p><strong>Uwagi dodatkowe:</strong> {{ takerData.uwagi }}</p>
        </div>
      </div>
      <hr>
      <!-- Grave users -->
      <user
        graveId="id"
        :users="usersData"
      />
      <hr>
    </q-page>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Grave from '../components/Views/Grave'
import User from '../components/Views/User'

export default {
  components: {
    'grave': Grave,
    'user': User
  },
  data () {
    return {
      id: this.$route.params.id,
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
  },
  methods: {
  },
};
</script>

<style>
hr {
  display: block;
  border: 0;
  height: 0;
  width: 96%;
  margin: 1rem auto;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
