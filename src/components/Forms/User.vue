<template>
  <div class="row q-pa-sm q-gutter-sm">
    <div class="row q-ma-md  full-width">
      <div class="col q-ma-md">
        <div class="row">
          <p><strong>Imię:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="user.imie"
            outlined
            name="imie"
            class="full-width"
          />
        </div>
      </div>

      <div class="col q-ma-md">
        <div class="row">
          <p><strong>Nazwisko:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="user.nazwisko"
            outlined
            name="nazwisko"
            class="full-width"
          />
        </div>
      </div>
    </div>
    <div class="row q-ma-md  full-width">
      <div class="col q-ma-md">
        <div class="row">
          <p><strong>Data urodzenia:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="user.dtUrodzenia"
            name="dtUrodzenia"
            outlined
            mask="date"
            :rules="['date']"
            class="full-width"
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

      <div class="col q-ma-md">
        <div class="row">
          <p><strong>Miejsce urodzenia:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="user.miejsceUrodzenia"
            outlined
            name="miejsceUrodzenia"
            class="full-width"
          />
        </div>
      </div>
    </div>
    <div class="row q-ma-md  full-width">
      <div class="col q-ma-md">
        <div class="row">
          <p><strong>Nazwisko rodowe:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="user.nazwiskoRodowe"
            outlined
            name="nazwiskoRodowe"
            class="full-width"
          />
        </div>
      </div>

      <div class="col q-ma-md">
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

    <div class="row q-ma-md  full-width">
      <div class="col q-ma-md">
        <div class="row">
          <p><strong>Data zgonu:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="user.dtZgonu"
            name="dtZgonu"
            outlined
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
      <div class="col q-ma-md">
        <div class="row">
          <p><strong>Miejsce zgonu:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="user.miejsceZgonu"
            outlined
            name="miejsceZgonu"
            class="full-width"
          />
        </div>
      </div>
      <div class="col q-ma-md">
        <div class="row">
          <p><strong>Data pochówku:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="user.dtPochowku"
            name="dtPochowku"
            outlined
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
      <div class="col q-ma-md">
        <div class="row">
          <p><strong>Miejsce pochówku:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="user.miejscePochowku"
            outlined
            name="miejscePochowku"
            class="full-width"
          />
        </div>
      </div>
    </div>

    <hr>

    <div class="row q-ma-md  full-width">
      <div class="col q-ma-md">
        <div class="row">
          <p><strong>Imię matki:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="user.imieMatki"
            outlined
            name="imieMatki"
            class="full-width"
          />
        </div>
      </div>
      <div class="col q-ma-md">
        <div class="row">
          <p><strong>Nazwisko Matki:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="user.nazwiskoMatki"
            outlined
            name="nazwiskoMatki"
            class="full-width"
          />
        </div>
      </div>
      <div class="col q-ma-md">
        <div class="row">
          <p><strong>Imię ojca:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="user.imieOjca"
            outlined
            name="imieOjca"
            class="full-width"
          />
        </div>
      </div>
      <div class="col q-ma-md">
        <div class="row">
          <p><strong>Nazwisko ojca:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="user.nazwiskoOjca"
            outlined
            name="nazwiskoOjca"
            class="full-width"
          />
        </div>
      </div>
    </div>
    <hr>
    <div class="row q-ma-md full-width">
      <template v-if="flag === 'edit'">
        <q-btn
          unelevated
          outline
          label="Zmień"
          size="md"
          class="q-ml-md"
          text-color="light-blue-13"
          @click="editUser()"
        />
      </template>
      <template v-else>
        <q-btn
          unelevated
          outline
          label="Dodaj"
          size="md"
          class="q-ml-md"
          text-color="light-blue-13"
          @click="addUser()"
        />
      </template>
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
    user: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      stanCywilnyOptions: [
        'Kawaler', 'Mężatka', 'Żonaty', 'Wdowa', 'Wdowiec'
      ],
    };
  },
  computed: {
  },
  mounted () {
    // eslint-disable-next-line no-console
    console.log(this.user);
  },
  methods: {
    addUser () {
    }
  },
}
</script>
