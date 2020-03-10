<template>
  <div class="row q-pa-sm q-gutter-sm">

    <div class="row q-ma-md">
      <div class="col">
        <div class="row">
          <p><strong>Imię:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="user.imie"
            outlined
            label="5"
            name="imie"
            class="full-width"
          />
        </div>
      </div>

      <div class="col">
        <div class="row">
          <p><strong>Nazwisko:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="user.nazwisko"
            outlined
            label="5"
            name="nazwisko"
            class="full-width"
          />
        </div>
      </div>
    </div>
    <div class="row q-ma-md">
      <div class="col">
        <div class="row">
          <p><strong>Data urodzenia:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            name="dtUrodzenia"
            outlined
            v-model="user.dtUrodzenia"
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
                    v-model="user.dtUrodzenia"
                    @input="() => $refs.qDateProxy.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>

      <div class="col">
        <div class="row">
          <p><strong>Miejsce urodzenia:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="user.miejsceUrodzenia"
            outlined
            label="5"
            name="miejsceUrodzenia"
            class="full-width"
          />
        </div>
      </div>
    </div>
    <div class="row q-ma-md">
      <div class="col">
        <div class="row">
          <p><strong>Nazwisko rodowe:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="user.nazwiskoRodowe"
            outlined
            label="5"
            name="nazwiskoRodowe"
            class="full-width"
          />
        </div>
      </div>

      <div class="col">
        <div class="row">
          <p><strong>Stan cywilny:</strong></p>
        </div>
        <div class="row full-width">
          <q-select
            v-model="user.stanCywilny"
            outlined
            :options="stanCywilnyOptions"
            label="Wybierz"
            name="stanCywilny"
            class="full-width"
          />
        </div>
      </div>
    </div>

    <hr>

    <div class="row q-ma-md">
      <div class="col">
        <div class="row">
          <p><strong>Data zgonu:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            name="dtZgonu"
            outlined
            v-model="user.dtZgonu"
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
                    v-model="user.dtZgonu"
                    @input="() => $refs.qDateProxy.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <div class="col">
        <div class="row">
          <p><strong>Miejsce zgonu:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="user.miejsceZgonu"
            outlined
            label="5"
            name="miejsceZgonu"
            class="full-width"
          />
        </div>
      </div>
      <div class="col">
        <div class="row">
          <p><strong>Data pochówku:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            name="dtPochowku"
            outlined
            v-model="user.dtPochowku"
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
                    v-model="user.dtPochowku"
                    @input="() => $refs.qDateProxy.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <div class="col">
        <div class="row">
          <p><strong>Miejsce pochówku:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="user.miejscePochowku"
            outlined
            label="5"
            name="miejscePochowku"
            class="full-width"
          />
        </div>
      </div>
    </div>

    <hr>

    <div class="row q-ma-md">
      <div class="col">
        <div class="row">
          <p><strong>Imię matki:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="user.imieMatki"
            outlined
            label="5"
            name="imieMatki"
            class="full-width"
          />
        </div>
      </div>
      <div class="col">
        <div class="row">
          <p><strong>Nazwisko Matki:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="user.nazwiskoMatki"
            outlined
            label="5"
            name="nazwiskoMatki"
            class="full-width"
          />
        </div>
      </div>
      <div class="col">
        <div class="row">
          <p><strong>Imię ojca:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="user.imieOjca"
            outlined
            label="5"
            name="imieOjca"
            class="full-width"
          />
        </div>
      </div>
      <div class="col">
        <div class="row">
          <p><strong>Nazwisko ojca:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="user.nazwiskoOjca"
            outlined
            label="5"
            name="nazwiskoOjca"
            class="full-width"
          />
        </div>
      </div>
    </div>

    <div class="row q-ma-md">
      Przycisk: Zmień
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
  data () {
    return {
    };
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  },
};
</script>
