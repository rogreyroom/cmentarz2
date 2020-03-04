<template>
  <div class="q-pa-md">
    <q-page padding>
      <div class="row q-pa-sm q-gutter-sm">
        <h5>
          Dane grobu:
          <strong class="q-ml-sm">{{ id }}</strong>
        </h5>
        <q-btn
          :to="{ name: 'grave-edit', params: {id: id} }"
          flat
          icon="edit"
          class="q-ml-md"
          text-color="light-blue-13"
        />
        <q-btn
          :to="{ name: 'grave-edit', params: {id: id} }"
          flat
          icon="map"
          class="q-ml-md"
          text-color="light-blue-13"
        />
      </div>
      <hr>
      <div class="row q-pa-sm q-gutter-sm">
        <div class="col">
          <q-img
            src="https://placeimg.com/500/300/nature"
            style="max-width: 400px; height: 200px;"
          />
          <!-- {{ graveData.ext }} -->
        </div>
        <div class="col q-ml-lg justify-start">
          <div class="row">
            <p><strong>Parcela:</strong> {{ graveData.parcela }}</p>
          </div>
          <div class="row">
            <p><strong>Rząd:</strong> {{ graveData.rzad }}</p>
          </div>
          <div class="row">
            <p><strong>Numer grobu:</strong> {{ graveData.grob }}</p>
          </div>
          <div class="row">
            <p><strong>Rodzaj grobu:</strong> {{ graveData.rodzaj }}</p>
          </div>
          <div class="row">
            <p><strong>Status grobu:</strong> {{ graveData.status }}</p>
          </div>
        </div>
      </div>
      <div class="row q-pa-sm q-gutter-sm">
        <div class="col">
          <p><strong>Okres opłaty:</strong> {{ graveData.okres }}</p>
        </div>
        <div class="col">
          <p><strong>Data opłaty:</strong> {{ graveData.dtOplaty }}</p>
        </div>
      </div>
      <div class="row q-pa-sm q-gutter-sm">
        <p><strong>Uwagi:</strong> {{ graveData.uwagi }}</p>
      </div>
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
      <div class="row q-pa-sm q-gutter-sm">
        <h5>
          Dane osoby zmarłej
        </h5>
        <q-btn
          :to="{ name: 'grave-add-user', params: {id: id} }"
          flat
          icon="add"
          class="q-ml-md"
          text-color="light-blue-13"
        />
      </div>
      <div
        v-for="{_id, user} in usersData"
        :key="_id"
        class="row q-pa-sm q-gutter-sm"
      >
        <!-- {{user}} -->
        <grave-user
          :id="_id"
          :user="user"
        />
      </div>
      <hr>
    </q-page>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GraveUser from '../components/GraveUser'

export default {
  components: {
    'grave-user': GraveUser
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
