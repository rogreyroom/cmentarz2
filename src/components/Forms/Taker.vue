<template>
  <div class="row q-pa-sm q-gutter-sm">
    <div class="row full-width">
      <div class="col q-ma-md">
        <div class="row">
          <p><strong>Imię</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="taker.imie"
            outlined
            label="Imię opiekuna grobu"
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
            v-model="taker.nazwisko"
            outlined
            label="Nazwisko opiekuna grobu"
            name="nazwisko"
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
            v-model="taker.adres"
            autogrow
            outlined
            label="Adres opiekuna grobu"
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
            v-model="taker.telefon"
            outlined
            label="Telefon do opiekuna grobu"
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
            v-model="taker.email"
            outlined
            label="Email do opiekuna grobu"
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
            v-model="taker.uwagi"
            autogrow
            outlined
            label="Wpisz ewentualne uwagi/notatki"
            name="uwagi"
            class="full-width"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  components: {
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    flag: {
      type: String,
      default: 'add'
    },
    taker: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
    };
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
  },
};
</script>
