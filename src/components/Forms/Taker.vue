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
            v-model="taker.tel"
            outlined
            label="Telefon do opiekuna grobu"
            name="tel"
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
            type="email"
            class="full-width"
            :rules="[isValidEmail]"
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
  methods: {
    isValidEmail (val) {
      if (val !== '') {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || 'Niewłaściwy adres email!';
      }
    }
  },
};
</script>
