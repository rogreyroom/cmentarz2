<template>
  <q-card
    flat
    class="bg-grey-1 q-ma-sm fit"
  >
    <q-card-section class="row q-gutter-md fit">
      <q-btn
        :to="{ name: 'user-add-edit', params: {id: id, user: user, flag: 'edit'} }"
        flat
        icon="edit"
        class="q-ml-sm"
        text-color="light-blue-13"
      />
      <q-btn
        flat
        icon="delete"
        class="q-ml-sm"
        text-color="light-blue-13"
        @click="deleteUser(id)"
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
    id: {
      type: String,
      default: ''
    },
    user: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    dateFormat (myDate) {
      return date.formatDate(myDate, "YYYY-MM-DD")
    },
    deleteUser (id) {
      // eslint-disable-next-line no-console
      console.log(id);
    }
  },
};
</script>
