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
          :to="{ name: 'grave-edit', params: {id: id} }"
          flat
          icon="edit"
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
      <!-- <q-card
        flat
        class="my-card bg-grey-1"
      >
        <q-card-section>
          <div class="row q-pa-sm q-gutter-sm">
            <h5>
              Dane osoby zmarłej
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
              <p><strong>Imię:</strong> {{ graveData.rzad }}</p>
              <p><strong>Nazwisko:</strong> {{ graveData.rzad }}</p>
              <p><strong>Wiek:</strong> {{ graveData.rzad }}</p>
              <p><strong>Stan cywilny:</strong> {{ graveData.rzad }}</p>
              <hr>
              <p><strong>Ojciec:</strong> {{ graveData.rzad }}</p>
              <p><strong>Matka:</strong> {{ graveData.rzad }}</p>
            </div>
            <div class="col">
              <p><strong>Data urodzenia:</strong> {{ graveData.rzad }}</p>
              <p><strong>Miejsce urodzenia:</strong> {{ graveData.rzad }}</p>
              <hr>
              <p><strong>Data zgonu:</strong> {{ graveData.rzad }}</p>
              <p><strong>Miejsce zgonu:</strong> {{ graveData.rzad }}</p>
              <hr class="row q-gutter-xs inset">
              <p><strong>Data pochówku:</strong> {{ graveData.rzad }}</p>
              <p><strong>Miejsce pochówku:</strong> {{ graveData.rzad }}</p>
            </div>
          </div>
        </q-card-section>
      </q-card> -->
      <hr>
      {{ usersData }}
      {{ takerData }}
      {{ graveData }}
    </q-page>
  </div>
</template>


    <!-- <h5>Dane grobu:
      <strong class="left-spacing">{{ gID }}</strong>
      <span class="left-spacing">
        <router-link
          class="edit"
          :to="'editGrave/' + grave.nrGrobu"
        >
          <i class="far fa-edit addCursor"></i>
        </router-link>
      </span>
    </h5>
    <hr>
    <div class="row">
      <div class="six columns">
        <div class="row">
          <p>
            <strong>Parcela:</strong> {{ theParcela }}</p>
        </div>
        <div class="row">
          <p>
            <strong>Rząd:</strong> {{ grave.rzad }}</p>
        </div>
        <div class="row">
          <p>
            <strong>Numer grobu:</strong> {{ grave.grob }}</p>
        </div>
      </div>
      <div class="six columns">
        <div class="row">
          <p>
            <strong>Rodzaj grobu:</strong> {{ grave.rodzaj }}</p>
        </div>
        <div class="row">
          <p>
            <strong>Status opłaty:</strong> {{ grave.status }}</p>
        </div>
        <div class="row">
          <p>
            <strong>Okres opłaty:</strong> {{ grave.okres }}</p>
        </div>
        <div class="row">
          <p>
            <strong>Data opłaty:</strong> {{ grave.dtOplaty ? convertDate(grave.dtOplaty) : '' }}</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="six columns">
        <div class="row">
          <div class="twelve columns">
            <p>
              <strong>Obraz</strong>
            </p>
            <div
              class="img-box"
              id="imgPreview"
              v-if="imgIs"
            >
              <img :src="imageData">
            </div>
          </div>
        </div>
      </div>
      <div class="six columns">
        <div class="row">
          <p>
            <strong>Uwagi:</strong>
          </p>
          <p>{{ grave.uwagi }}</p>

        </div>
      </div>

    </div>

    <hr>
    <div class="row">
      <h5>Dane opiekuna grobu
        <span class="left-spacing edit">
          <router-link :to="'editGrave/' + grave.nrGrobu">
            <i class="far fa-edit addCursor"></i>
          </router-link>
        </span>
      </h5>
    </div>

    <div v-show="isTaker">

      <div class="row">

        <div class="six columns">
          <div class="row">
            <p>
              <strong>Imię:</strong> {{ taker.imie }}</p>
          </div>
          <div class="row">
            <p>
              <strong>Nazwisko:</strong> {{ taker.nazwisko }}</p>
          </div>
          <div class="row">
            <p>
              <strong>Telefon:</strong> {{ taker.tel }}</p>
          </div>
          <div class="row">
            <p>
              <strong>Email:</strong> {{ taker.email }}</p>
          </div>
        </div>

        <div class="six columns">
          <div class="row">
            <p>
              <strong>Adres:</strong> {{ taker.adres }}</p>
          </div>
          <div class="row">
            <p>
              <strong>Uwagi dodatkowe:</strong> {{ taker.uwagi }}</p>
          </div>
        </div>

      </div>

    </div>

    <hr>
    <div class="row">
      <h5>Dane osoby zmarłej
        <span class="left-spacing add">
          <router-link :to="'addUser/' + grave.nrGrobu">
            <i class="far fa-plus-square addCursor"></i>
          </router-link>
        </span>
      </h5>
    </div>

    <div v-show="isUser">

      <div
        v-for="person in users"
        :key="person._id"
      >
        <div class="user-box">

          <div class="row">
            <h5 class="left-spacing">
              <router-link
                class="edit"
                :to="'editUser/' + person._id"
              >
                <i class="far fa-edit addCursor"></i>
              </router-link>
              <span
                class="left-spacing link del"
                @click="delUser(person._id)"
              >
                <i class="far fa-trash-alt addCursor"></i>
              </span>
            </h5>
          </div>

          <div class="row">

            <div class="six columns">
              <div class="row">
                <p>
                  <strong>Imię:</strong> {{ person.user.imie }}</p>
              </div>
              <div class="row">
                <p>
                  <strong>Nazwisko:</strong>{{ person.user.nazwisko }}</p>
              </div>
              <div class="row">
                <p>
                  <strong>Wiek:</strong> {{ person.user.wiek }}</p>
              </div>
              <div class="row">
                <p>
                  <strong>Stan cywilny:</strong> {{ person.user.stanCywilny }}</p>
              </div>
              <hr class="no-marg">
              <div class="row">
                <p>
                  <strong>Ojciec:</strong> {{ person.user.imieOjca }} {{ person.user.nazwiskoOjca }}</p>
              </div>
              <div class="row">
                <p>
                  <strong>Matka:</strong> {{ person.user.imieMatki }} {{ person.user.nazwiskoMatki }}</p>
              </div>
            </div>

            <div class="six columns">
              <div class="row">
                <p>
                  <strong>Data urodzenia:</strong> {{ person.user.dtUrodzenia ? convertDate(person.user.dtUrodzenia) : '' }}</p>
              </div>
              <div class="row">
                <p>
                  <strong>Miejsce urodzenia:</strong> {{ person.user.miejsceUrodzenia }}</p>
              </div>
              <hr class="no-marg">
              <div class="row">
                <p>
                  <strong>Data zgonu:</strong> {{ person.user.dtZgonu ? convertDate(person.user.dtZgonu) : '' }}</p>
              </div>
              <div class="row">
                <p>
                  <strong>Miejsce zgonu:</strong> {{ person.user.miejsceZgonu }}</p>
              </div>
              <hr class="no-marg">
              <div class="row">
                <p>
                  <strong>Data pochówku:</strong> {{person.user.dtPochowku ? convertDate(person.user.dtPochowku) : '' }}</p>
              </div>
              <div class="row">
                <p>
                  <strong>Miejsce pochówku:</strong> {{ person.user.miejscePochowku }}</p>
              </div>
            </div>

          </div>

        </div>
        <hr>

      </div>

    </div>

  </div>
</template> -->

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
