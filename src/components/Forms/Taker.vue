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
    <template v-if="flag === 'edit'">
      <div class="row full-width">
        <q-btn
          unelevated
          outline
          label="Zmień"
          size="md"
          class="q-ml-md"
          text-color="light-blue-13"
          @click="updateTaker(1)"
        />
      </div>
    </template>
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
    updateTaker (id) {
      // eslint-disable-next-line no-console
      console.log(id);
    }
  },
};
</script>
