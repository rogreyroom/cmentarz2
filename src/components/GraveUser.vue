<template>
  <q-card
    flat
    class="bg-grey-1 q-ma-sm fit"
  >
    <q-card-section class="row q-gutter-md fit">
      <q-btn
        :to="{ name: 'user-edit', params: {id: id} }"
        flat
        icon="edit"
        class="q-ml-sm"
        text-color="light-blue-13"
      />
      <q-btn
        :to="{ name: 'user-delete', params: {id: id} }"
        flat
        icon="delete"
        class="q-ml-sm"
        text-color="light-blue-13"
      />
    </q-card-section>
    <q-card-section class="row q-gutter-md fit">
      <div class="col">
        <p><strong>Imię:</strong> {{ user.imie }}</p>
        <p><strong>Nazwisko:</strong> {{ user.nazwisko }}</p>
        <p><strong>Wiek:</strong> {{ user.wiek }}</p>
        <p><strong>Stan cywilny:</strong> {{ user.stanCywilny }}</p>
        <hr>
        <p><strong>Ojciec:</strong> {{ `${user.imieOjca || ''} ${user.nazwiskoOjca || ''}`.trim() }}</p>
        <p><strong>Matka:</strong> {{ `${user.imieMatki || ''} ${user.nazwiskoMatki || ''}`.trim() }}</p>
      </div>
      <div class="col">
        <p><strong>Data urodzenia:</strong> {{ dateFormat(user.dtUrodzenia) }}</p>
        <p><strong>Miejsce urodzenia:</strong> {{ user.miejsceUrodzenia }}</p>
        <hr>
        <p><strong>Data zgonu:</strong> {{ dateFormat(user.dtZgonu) }}</p>
        <p><strong>Miejsce zgonu:</strong> {{ user.miejsceZgonu }}</p>
        <hr>
        <p><strong>Data pochówku:</strong> {{ dateFormat(user.dtPochowku) }}</p>
        <p><strong>Miejsce pochówku:</strong> {{ user.miejscePochowku }}</p>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { date } from 'quasar'

export default {
  props: {
    id: String,
    user: Object
  },
  methods: {
    dateFormat (myDate) {
      return date.formatDate(myDate, "YYYY-MM-DD")
    },
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
