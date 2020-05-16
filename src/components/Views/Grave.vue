<template>
  <section class="q-pa-md">
    <div class="row no-wrap items-center q-p-none">
      <h5 class="q-headline col q-ma-xs">
        Dane grobu:
        <strong class="q-ml-sm">{{ id }}</strong>
        <q-btn
          :to="{ name: 'grave-add-edit', params: { id: id, flag: 'edit', cemetery: cemetery }}"
          flat
          icon="edit"
          class="q-ml-md"
          text-color="light-blue-13"
        />
        <q-btn
          flat
          icon="delete"
          class="q-ml-md"
          text-color="light-blue-13"
          @click="removeGrave"
        />
        <q-btn
          :to="{ name: 'cemetery-map', params: { id: id, flag:'show-grave', name: grave.parcela, grave: { cm: grave.parcela, r: grave.rzad, g: grave.grob } }}"
          flat
          icon="map"
          class="q-ml-md"
          text-color="light-blue-13"
        />
      </h5>
      <div class="column col-1 items-end">
        <q-btn
          v-go-back.single=" '/' "
          size="14px"
          round
          dense
          color="indigo-9"
          icon="arrow_back"
          class="q-mr-sm"
        >
          <q-tooltip
            anchor="top middle"
            self="center middle"
            transition-show="scale"
            transition-hide="scale"
            content-class="bg-blue-4"
          >
            Wróć
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <hr>
    <div class="row q-pa-sm q-gutter-sm">
      <div class="col">
        <div class="row q-ma-md">
          <q-img
            :src="getUrl"
            style="height: 300px;"
            class="full-width"
            contain
          />
        </div>
        <div class="row q-ma-md">
          <p><strong>Uwagi:</strong> {{ grave.uwagi }}</p>
        </div>
      </div>
      <div class="col">
        <div class="row q-ma-md">
          <p><strong>Parcela:</strong> {{ cemetery }}</p>
        </div>
        <div class="row q-ma-md">
          <p><strong>Rząd:</strong> {{ grave.rzad }}</p>
        </div>
        <div class="row q-ma-md">
          <p><strong>Numer grobu:</strong> {{ grave.grob }}</p>
        </div>
        <div class="row q-ma-md">
          <p><strong>Rodzaj grobu:</strong> {{ grave.rodzaj }}</p>
        </div>
        <div class="row q-ma-md">
          <p><strong>Status grobu:</strong> {{ grave.status }}</p>
        </div>
        <div class="row q-ma-md">
          <p><strong>Okres opłaty:</strong> {{ grave.okres }}</p>
        </div>
        <div class="row q-ma-md">
          <p><strong>Data opłaty:</strong> {{ grave.dtOplaty }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    grave: {
      type: Object,
      default: function () {
        return {}
      }
    },
    cemetery: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      url: 'http://localhost:8000/images/',
    }

  },
  computed: {
    getUrl () {
      return this.grave.imgFileName
        ? `${this.url}${this.grave.imgFileName}?${+ Date.now()}`
        : this.grave.ext
          ? `${this.url}${this.createImageName()}.${this.grave.ext}?${+ Date.now()}`
          : ''
    }
  },
  methods: {
    ...mapActions("cm", ["REMOVE_GRAVE"]),

    createImageName () {
      return `${this.id.replace(/\|/gi, '-')}`;
    },

    removeGrave () {
      this.$q.notify({
        message: 'Czy na pewno chcesz usunąć ten grób?',
        color: 'light-blue-14',
        position: 'center',
        icon: 'warning',
        timeout: 0,
        actions: [
          {
            label: 'Tak',
            color: 'white',
            handler: async () => {
              await this['REMOVE_GRAVE'](this.id)
              if (this.grave.hasOwnProperty('ext')) {
                await this.$axios
                  .delete(`/images/remove/${this.createImageName()}.${this.grave.ext}`)
                  .then(() => {
                    true
                  })
                  .catch(() => {
                    this.$notifyAlert('Nie udało się usunąć zdjęcia.', 'nagative', 1500)
                  });
              }
              window.history.back()
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
  },
};
</script>
