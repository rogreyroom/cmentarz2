
<template>
  <div class="row q-pa-sm q-gutter-sm">
    <div class="col">
      <template v-if="flag === 'add' && grave.parcela && grave.rzad && grave.grob">
        <div class="row q-ma-md">
          <q-uploader
            label="Dodaj zdjęcie"
            auto-upload
            :url="uploadUrl"
            class="full-width"
            flat
            color="light-blue-13"
          />
        </div>
      </template>
      <template v-else-if="flag === 'edit'">
        <div class="row q-ma-md">
          <q-uploader
            label="Zmień zdjęcie"
            auto-upload
            :url="uploadUrl"
            class="full-width"
            flat
            color="light-blue-13"
          />
        </div>
        <div class="row q-ma-md">
          <q-img
            :src="getUrl"
            style="height: 300px;"
            class="full-width"
          />
        </div>
      </template>
      <div class="row q-ma-md">
        <div class="row">
          <p><strong>Uwagi:</strong></p>
        </div>
        <div class="row  full-width">
          <q-input
            v-model="grave.uwagi"
            outlined
            label="Wpisz ewentualne uwagi/notatki"
            autogrow
            name="uwagiG"
            class="full-width"
          />
        </div>
      </div>
    </div>
    <div class="col q-ml-lg">
      <template v-if="flag === 'edit'">
        <div class="row q-ma-md">
          <p><strong>Parcela:</strong> {{ cemetery }}</p>
        </div>
        <div class="row q-ma-md">
          <p><strong>Rząd:</strong> {{ grave.rzad }}</p>
        </div>
        <div class="row q-ma-md">
          <p><strong>Numer grobu:</strong> {{ grave.grob }}</p>
        </div>
      </template>
      <template v-else>
        <div class="row q-ma-md">
          <div class="row">
            <p><strong>Parcela:</strong></p>
          </div>
          <div class="row full-width">
            <q-select
              v-model="grave.parcela"
              outlined
              :options="cemeteriesList"
              option-label="cmFullName"
              option-value="cName"
              emit-value
              map-options
              label="Wybierz cmentarz/parcelę"
              name="parcela"
              class="full-width"
              :rules="[val => !!val || 'Pole jest wymagane']"
              @change="createGraveName"
            />
          </div>
        </div>
        <div class="row q-ma-md">
          <div class="row">
            <p><strong>Rząd:</strong></p>
          </div>
          <div class="row full-width">
            <q-input
              v-model="grave.rzad"
              type="number"
              outlined
              label="Podaj numer rzędu cmentarza/parceli"
              name="rzad"
              class="full-width"
              :rules="[val => !!val || 'Pole jest wymagane']"
              @change="createGraveName"
            />
          </div>
        </div>
        <div class="row q-ma-md">
          <div class="row">
            <p><strong>Numer grobu:</strong></p>
          </div>
          <div class="row full-width">
            <q-input
              v-model="grave.grob"
              type="number"
              outlined
              label="Podaj numer grobu cmentarza/parceli"
              name="grob"
              class="full-width"
              :rules="[val => !!val || 'Pole jest wymagane']"
              @change="createGraveName"
            />
          </div>
        </div>
      </template>
      <div class="row q-ma-md">
        <div class="row">
          <p><strong>Rodzaj grobu:</strong></p>
        </div>
        <div class="row full-width">
          <q-select
            v-model="grave.rodzaj"
            outlined
            :options="graveOptions"
            label="Wybierz rodzaj grobu"
            name="rodzaj"
            class="full-width"
            :rules="[val => !!val || 'Pole jest wymagane']"
          />
        </div>
      </div>
      <div class="row q-ma-md">
        <div class="row">
          <p><strong>Status grobu:</strong></p>
        </div>
        <div class="row full-width">
          <q-select
            v-model="grave.status"
            outlined
            :options="graveStatus"
            label="Wybierz status grobu"
            name="status"
            class="full-width"
            :rules="[val => !!val || 'Pole jest wymagane']"
          />
        </div>
      </div>
      <div class="row q-ma-md">
        <div class="row">
          <p><strong>Okres opłaty:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model.number="grave.okres"
            type="number"
            outlined
            min="1"
            name="okres"
            label="Podaj okres na jaki grób jest opłacony"
            class="full-width"
            :rules="[
              val => val > 0 || (val === undefined || val === '') || 'Okres opłaty powinien być większy od zera!'
            ]"
          />
        </div>
      </div>
      <div
        v-if="grave.okres && grave.okres > 0"
        class="row q-ma-md"
      >
        <div class="row">
          <p><strong>Data opłaty:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="grave.dtOplaty"
            outlined
            label="Podaj datę opłaty grobu"
            error-message="Podaj datę!"
            :error="!isValidDate"
            class="row full-width"
          >
            <template v-slot:append>
              <q-icon
                name="event"
                class="cursor-pointer"
              >
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="grave.dtOplaty"
                    mask="YYYY-MM-DD"
                    @input="() => $refs.qDateProxy.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { date } from 'quasar'
import { mapState, mapGetters } from "vuex"

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
      graveOptions: [
        'Zwykły', 'Murowany', 'Rodzinny', 'Katakumba', 'Głębinowy'
      ],
      graveStatus: [
        'Nie opłacony', 'Opłacony', 'Puste'
      ],
      cemeteriesList: [],
      date: null,
      url: 'http://localhost:8000/images/',
      newGrave: ''
    };
  },
  computed: {
    ...mapState("cm", ["cemeteries", "graves"]),
    ...mapGetters({ getGrave: "cm/GET_GRAVE" }),
    isValidDate () {
      return this.grave.dtOplaty === this.dateFormat(this.grave.dtOplaty)
    },

    isValidNumber () {
      return val => { if (val.length > 0 && val > 0) return true }
    },

    getUrl () {
      return this.grave.imgFileName ? `${this.url}${this.grave.imgFileName}` : ''
    }
  },
  created () {
    this.cemeteriesList = this.cemeteries.map(({ thecm }) => thecm)
    this.date = this.grave.dtOplaty
  },
  methods: {
    dateFormat (myDate) {
      return date.formatDate(myDate, "YYYY-MM-DD")
    },

    onIntersection (entry) {
      if (entry.isIntersecting) {
        this.src = this.$props.grave.imgPath
      }
    },

    uploadUrl (file) {
      if (this.flag === 'add') {
        const ext = file[0].name.split('.').slice(-1)
        this.grave.ext = ext
        this.grave.nrGrobu = `P${this.grave.parcela}|R${this.grave.rzad}|G${this.grave.grob}`
        const graveExists = this.getGrave(this.grave.nrGrobu).length > 0 ? true : false
        if (graveExists)
          return this.$notifyAlert('Grób o tym numerze już istnieje!', 'error')
        return `${this.url}upload/${this.newGrave}.${ext}`
      } else {
        return `${this.url}upload/${this.grave.imgFileName}`
      }
    },

    createGraveName () {
      if (this.grave.parcela && this.grave.rzad && this.grave.grob) {
        this.newGrave = `P${this.grave.parcela}-R${this.grave.rzad}-G${this.grave.grob}`
      }
    }
  },
};
</script>
