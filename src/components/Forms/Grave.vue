<template>
  <div class="row q-pa-sm q-gutter-sm">
    <div class="col">
      <div class="row q-ma-md">
        <!-- <label for="image">Zdjęcie</label>
            <button v-on:click.prevent="photoLoader()" class="button">{{ (grave.grob !== '') ? 'Zmień zdjęcie' : 'Dodaj zdjęcie' }}</button>
            <input id="zdjecie" @change="previewImage" accept="image/*" type="file" style="display:none;" /> -->
        <q-uploader
          label="Auto Uploader"
          auto-upload
          url="http://localhost:4444/upload"
          class="full-width"
          flat
          color="light-blue-13"
        />
      </div>
      <div class="row q-ma-md">
        <q-img
          src="https://placeimg.com/500/300/nature"
          style="height: 300px;"
          class="full-width"
        />
      </div>
      <div class="row q-ma-md">
        <p><strong>Data opłaty:</strong></p>
      </div>
      <div class="row q-ma-md">
        <!-- <q-date
          v-model="graveData.dtOplaty"
          minimal
          name="dtOplaty"
          class="full-width"
          flat
        /> -->
        <q-input
          name="dtOplaty"
          outlined
          v-model="grave.dtOplaty"
          mask="date"
          :rules="['date']"
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
                  @input="() => $refs.qDateProxy.hide()"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
    <div class="col q-ml-lg">
      <div v-if="flag === 'edit'">

        <!-- TODO: check if parcela is no a list of options -->
        <div class="row">
          <p><strong>Parcela:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="grave.parcela"
            outlined
            label="5"
            name="parcela"
            class="full-width"
          />
        </div>

        <div class="row">
          <p><strong>Rząd:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="grave.rzad"
            outlined
            label="5"
            name="rzad"
            class="full-width"
          />
        </div>

        <div class="row">
          <p><strong>Numer grobu:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="grave.grob"
            outlined
            label="5"
            name="grob"
            class="full-width"
          />
        </div>
      </div>
      <div v-else>
        <div class="row q-ma-md">
          <p><strong>Parcela:</strong> {{ grave.parcela }}</p>
        </div>

        <div class="row q-ma-md">
          <p><strong>Rząd:</strong> {{ grave.rzad }}</p>
        </div>

        <div class="row q-ma-md">
          <p><strong>Numer grobu:</strong> {{ grave.grob }}</p>
        </div>
      </div>
      <div class="row q-ma-md">
        <div class="row">
          <p><strong>Rodzaj grobu:</strong></p>
        </div>
        <div class="row full-width">
          <q-select
            v-model="grave.rodzaj"
            outlined
            :options="graveOptions"
            label="Wybierz"
            name="rodzaj"
            class="full-width"
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
            label="Wybierz"
            name="status"
            class="full-width"
          />
        </div>
      </div>
      <div class="row q-ma-md">
        <div class="row">
          <p><strong>Okres opłaty:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="grave.okres"
            outlined
            label="5"
            name="okres"
            class="full-width"
          />
        </div>
      </div>
      <div class="row q-ma-md">
        <div class="rom">
          <p><strong>Uwagi:</strong></p>
        </div>
        <div class="row  full-width">
          <q-input
            v-model="grave.uwagi"
            filled
            autogrow
            name="uwagiG"
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
    grave: {
      type: Object,
      default: function () {
        return {}
      }
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

    };
  },
  computed: {
  },
  mounted () {
  },
  methods: {

    // How to emit submit data into parent
    // Form validation goes here

  },
};
</script>

