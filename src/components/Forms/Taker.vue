<template>
  <!--  q-pa-sm q-gutter-sm -->
  <div class="row q-pa-sm q-gutter-sm">
    <div class="row full-width">
      <div class="col q-ma-md">
        <div class="row">
          <p><strong>Imię</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="graveData.imie"
            outlined
            name="imie"
            class="full-width"
          />
        </div>
      </div>

      <div class="col q-ma-md">
        <div class="row">
          <p><strong>Nazwisko</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="graveData.imie"
            outlined
            name="imie"
            class="full-width"
          />
        </div>
      </div>

      <div class="col q-ma-md">
        <div class="row">
          <p><strong>Adres</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="graveData.imie"
            autogrow
            outlined
            name="adres"
            class="full-width"
          />
        </div>
      </div>
    </div>

    <div class="row full-width">
      <div class="col q-ma-md">
        <div class="row">
          <p><strong>Telefon</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="graveData.imie"
            outlined
            name="telefon"
            class="full-width"
          />
        </div>
      </div>

      <div class="col q-ma-md">
        <div class="row">
          <p><strong>Email</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="graveData.imie"
            outlined
            name="email"
            class="full-width"
          />
        </div>
      </div>

      <div class="col q-ma-md">
        <div class="row">
          <p><strong>Uwagi dodatkowe</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="graveData.imie"
            filled
            autogrow
            outlined
            name="uwagi"
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
