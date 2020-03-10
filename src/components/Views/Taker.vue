<template>
  <section>
    <div class="row q-pa-sm q-gutter-sm">
      <h5>
        Dane opiekuna grobu
      </h5>
      <q-btn
        :to="{ name: 'taker-edit', params: { id: id } }"
        flat
        icon="edit"
        class="q-ml-md"
        text-color="light-blue-13"
      />
    </div>
    <div class="row q-pa-sm q-gutter-sm">
      <div class="col">
        <p><strong>Imię:</strong> {{ taker.imie }}</p>
        <p><strong>Nazwisko:</strong> {{ taker.nazwisko }}</p>
        <p><strong>Telefon:</strong> {{ taker.tel }}</p>
        <p><strong>Email:</strong> {{ taker.email }}</p>
      </div>
      <div class="col">
        <p><strong>Adres:</strong> {{ taker.adres }}</p>
        <p><strong>Uwagi dodatkowe:</strong> {{ taker.uwagi }}</p>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    taker: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
};
</script>
