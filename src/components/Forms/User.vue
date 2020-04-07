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
            label="Imię osoby zmarłej"
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
            label="Nazwisko osoby zmarłej"
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
            label="Data urodzenia osoby zmarłej"
            error-message="Podaj datę!"
            :error="!isValidBirthDate"
            class="full-width"
          >
            <template v-slot:append>
              <q-icon
                name="event"
                class="cursor-pointer"
              >
                <q-popup-proxy
                  ref="q1DateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="user.dtUrodzenia"
                    mask="YYYY-MM-DD"
                    @input="() => $refs.q1DateProxy.hide()"
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
            label="Miejsce urodzenia osoby zmarłej"
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
            label="Nazwisko rodowe osoby zmarłej"
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
            label="Wybierz stan cywilny"
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
            label="Data zgonu osoby zmarłej"
            error-message="Podaj datę!"
            :error="!isValidDeathDate"
          >
            <template v-slot:append>
              <q-icon
                name="event"
                class="cursor-pointer"
              >
                <q-popup-proxy
                  ref="q2DateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="user.dtZgonu"
                    mask="YYYY-MM-DD"
                    @input="() => $refs.q2DateProxy.hide()"
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
            label="Miejsce zgonu osoby zmarłej"
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
            label="Data pochówku osoby zmarłej"
            error-message="Podaj datę!"
            :error="!isValidBurialDate"
          >
            <template v-slot:append>
              <q-icon
                name="event"
                class="cursor-pointer"
              >
                <q-popup-proxy
                  ref="q3DateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="user.dtPochowku"
                    mask="YYYY-MM-DD"
                    @input="() => $refs.q3DateProxy.hide()"
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
            label="Miejsce pochówku osoby zmarłej"
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
            label="Imię matki osoby zmarłej"
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
            label="Nazwisko matki osoby zmarłej"
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
            label="Imię ojca osoby zmarłej"
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
            label="Nazwisko ojca osoby zmarłej"
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
      <template v-else-if="flag === 'add-new'">
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
import { date } from 'quasar'

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
    isValidBirthDate () {
      return this.user.dtUrodzenia === this.dateFormat(this.user.dtUrodzenia)
    },
    isValidDeathDate () {
      return this.user.dtZgonu === this.dateFormat(this.user.dtZgonu)
    },
    isValidBurialDate () {
      return this.user.dtPochowku === this.dateFormat(this.user.dtPochowku)
    }
  },
  mounted () {
    // eslint-disable-next-line no-console
    console.log(this.user);
  },
  methods: {
    dateFormat (myDate) {
      return date.formatDate(myDate, "YYYY-MM-DD")
    },
    addUser () {
    }
  },
}
</script>
