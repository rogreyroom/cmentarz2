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
            v-model="taker.imie"
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
            v-model="taker.nazwisko"
            outlined
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
            filled
            autogrow
            outlined
            name="uwagi"
            class="full-width"
          />
        </div>
      </div>
    </div>

    <q-btn
      flat
      class="q-ml-md"
      text-color="light-blue-13"
      @click="updateTaker(taker)"
    />
  </div>
</template>
<script>
// Flag determines if data is added as new or edited

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
  mounted () {
  },
  methods: {
  },
};
</script>
