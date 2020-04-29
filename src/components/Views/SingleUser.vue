<template>
  <q-card
    flat
    class="bg-grey-1 q-ma-sm fit"
  >
    <q-card-section class="row q-gutter-md fit">
      <q-btn
        :to="{ name: 'user-add-edit', params: {id: id, grave: grave, user: user, flag: 'edit-user'} }"
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
        @click="removeUser(id)"
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
import { mapActions } from 'vuex'

export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    grave: {
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
    ...mapActions("cm", ["REMOVE_USER"]),

    dateFormat (myDate) {
      return date.formatDate(myDate, "YYYY-MM-DD")
    },

    removeUser (id) {
      this.$q.notify({
        message: 'Czy na pewno chcesz usunąć zmarłego z tego grobu?',
        color: 'light-blue-14',
        position: 'center',
        icon: 'warning',
        timeout: 0,
        actions: [
          {
            label: 'Tak',
            color: 'white',
            handler: async () => {
              await this['REMOVE_USER'](id)
              await this.$emit('update-users')
              this.$notifyAlert('Dane zostały pomyślnie usunięte z bazy.', 'ok', 1500)
            }
          },
          {
            label: 'Nie',
            color: 'yellow'
          }
        ]
      })
    }
  }
};
</script>
