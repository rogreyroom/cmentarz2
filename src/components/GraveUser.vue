<template>
  <!-- Grave users -->
  <q-card
    flat
    class="my-card bg-grey-1"
  >

    {{ id }}
    {{ user }}

    <q-card-section>
      <div class="col">
        <p><strong>Imię:</strong> {{ user.imie }}</p>
        <p><strong>Nazwisko:</strong> {{ user.nazwisko }}</p>
        <p><strong>Wiek:</strong> {{ user.wiek }}</p>
        <p><strong>Stan cywilny:</strong> {{ stanCywilny }}</p>
        <hr>
        <p><strong>Ojciec:</strong> {{ `${user.imieOjca} ${user.nazwiskoOjca}` }}</p>
        <p><strong>Matka:</strong> {{ `${user.imieMatki} ${user.nazwiskoMatki}` }}</p>
      </div>
      <div class="col">
        <p><strong>Data urodzenia:</strong> {{ user.dtUrodzenia }}</p>
        <p><strong>Miejsce urodzenia:</strong> {{ user.miejsceUrodzenia }}</p>
        <hr>
        <p><strong>Data zgonu:</strong> {{ user.dtZgonu }}</p>
        <p><strong>Miejsce zgonu:</strong> {{ user.miejsceZgonu }}</p>
        <hr class="row q-gutter-xs inset">
        <p><strong>Data pochówku:</strong> {{ user.dtPochowku }}</p>
        <p><strong>Miejsce pochówku:</strong> {{ user.miejscePochowku }}</p>
      </div>
    </q-card-section>

  </q-card>
</template>

<script>

export default {
  // props:  ['user'],
  props: {
    id: String,
    user: Object,
  },
  // props: {
  //   id: String,
  //   user: Object,
  //   imie: String,
  //   nazwisko: String,
  //   wiek: Number,
  //   stanCywilny: String,
  //   imieOjca: String,
  //   nazwiskoOjca: String,
  //   imieMatki: String,
  //   nazwiskoMatki: String,
  //   dtUrodzenia: Date,
  //   miejsceUrodzenia: String,
  //   dtZgonu: Date,
  //   miejsceZgonu: String,
  //   dtPochowku: Date,
  //   miejscePochowku: String
  // },
  data () {
    return {

    };
  }
};
</script>

<style>
</style>
