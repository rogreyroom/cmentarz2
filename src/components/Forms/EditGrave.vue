<template>
  <div class="row q-pa-sm q-gutter-sm">
    <div class="col">
      <div class="row q-ma-md">
        <!-- <label for="image">Zdjęcie</label>
            <button v-on:click.prevent="photoLoader()" class="button">{{ (grave.grob !== '') ? 'Zmień zdjęcie' : 'Dodaj zdjęcie' }}</button>
            <input id="zdjecie" @change="previewImage" accept="image/*" type="file" style="display:none;" /> -->
        <q-uploader
          label="Auto Uploader"
          auto-upload
          url="http://localhost:4444/upload"
          class="full-width"
          flat
          color="light-blue-13"
        />
      </div>
      <div class="row q-ma-md">
        <q-img
          src="https://placeimg.com/500/300/nature"
          style="height: 300px;"
          class="full-width"
        />
      </div>
      <div class="row q-ma-md">
        <p><strong>Data opłaty:</strong></p>
      </div>
      <div class="row q-ma-md">
        <q-date
          v-model="graveData.dtOplaty"
          minimal
          name="dtOplaty"
          class="full-width"
          flat
        />
      </div>
    </div>
    <div class="col q-ml-lg">
      <div class="row q-ma-md">
        <p><strong>Parcela:</strong> {{ graveData.parcela }}</p>
      </div>
      <div class="row q-ma-md">
        <p><strong>Rząd:</strong> {{ graveData.rzad }}</p>
      </div>
      <div class="row q-ma-md">
        <p><strong>Numer grobu:</strong> {{ graveData.grob }}</p>
      </div>
      <div class="row q-ma-md">
        <div class="row">
          <p><strong>Rodzaj grobu:</strong></p>
        </div>
        <div class="row full-width">
          <q-select
            v-model="graveData.rodzaj"
            outlined
            :options="graveOptions"
            label="Wybierz"
            name="rodzaj"
            class="full-width"
          />
        </div>
      </div>
      <div class="row q-ma-md">
        <div class="row">
          <p><strong>Status grobu:</strong></p>
        </div>
        <div class="row full-width">
          <q-select
            v-model="graveData.status"
            outlined
            :options="graveStatus"
            label="Wybierz"
            name="status"
            class="full-width"
          />
        </div>
      </div>
      <div class="row q-ma-md">
        <div class="row">
          <p><strong>Okres opłaty:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="graveData.okres"
            outlined
            label="5"
            name="okres"
            class="full-width"
          />
        </div>
      </div>
      <div class="row q-ma-md">
        <div class="rom">
          <p><strong>Uwagi:</strong></p>
        </div>
        <div class="row  full-width">
          <q-input
            v-model="graveData.uwagi"
            filled
            autogrow
            name="uwagiG"
            class="full-width"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import GraveUser from '../components/GraveUser'

export default {
  components: {
    // 'grave-user': GraveUser
  },
  data () {
    return {
      id: this.$route.params.id,
      graveData: {},
      takerData: {},
      usersData: [],
      graveOptions: [
        'Zwykły', 'Murowany', 'Rodzinny', 'Katakumba', 'Głębinowy'
      ],
      graveStatus: [
        'Nie opłacony', 'Opłacony', 'Puste'
      ],

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
