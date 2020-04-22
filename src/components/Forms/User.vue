<template>
  <div class="row q-pa-sm q-gutter-sm">
    <q-form
      ref="userForm"
      greedy
      @submit.prevent="getFormsData"
    >
      <div class="row q-ma-md  full-width">
        <div class="col q-ma-md">
          <div class="row">
            <p><strong>Imię:</strong></p>
          </div>
          <div class="row full-width">
            <q-input
              v-model="userData.imie"
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
              v-model="userData.nazwisko"
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
              v-model="userData.dtUrodzenia"
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
                      v-model="userData.dtUrodzenia"
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
              v-model="userData.miejsceUrodzenia"
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
              v-model="userData.nazwiskoRodowe"
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
              v-model="userData.stanCywilny"
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
              v-model="userData.dtZgonu"
              name="dtZgonu"
              outlined
              label="Data zgonu osoby zmarłej"
              error-message="Podaj datę!"
              :error="!isValidDeathDate"
              class="full-width"
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
                      v-model="userData.dtZgonu"
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
              v-model="userData.miejsceZgonu"
              outlined
              label="Miejsce zgonu osoby zmarłej"
              name="miejsceZgonu"
              class="full-width"
            />
          </div>
        </div>
      </div>
      <div class="row q-ma-md  full-width">
        <div class="col q-ma-md">
          <div class="row">
            <p><strong>Data pochówku:</strong></p>
          </div>
          <div class="row full-width">
            <q-input
              v-model="userData.dtPochowku"
              name="dtPochowku"
              outlined
              label="Data pochówku osoby zmarłej"
              error-message="Podaj datę!"
              :error="!isValidBurialDate"
              class="full-width"
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
                      v-model="userData.dtPochowku"
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
              v-model="userData.miejscePochowku"
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
              v-model="userData.imieMatki"
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
              v-model="userData.nazwiskoMatki"
              outlined
              label="Nazwisko matki osoby zmarłej"
              name="nazwiskoMatki"
              class="full-width"
            />
          </div>
        </div>
        <div class="row q-ma-md  full-width">
          <div class="col q-ma-md">
            <div class="row">
              <p><strong>Imię ojca:</strong></p>
            </div>
            <div class="row full-width">
              <q-input
                v-model="userData.imieOjca"
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
                v-model="userData.nazwiskoOjca"
                outlined
                label="Nazwisko ojca osoby zmarłej"
                name="nazwiskoOjca"
                class="full-width"
              />
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div
        v-if="flag === 'add-user' || flag === 'edit-user'"
        class="row q-ma-md full-width"
      >
        <q-btn
          outline
          :label="flag === 'add-user' ? 'Dodaj' : 'Zmień'"
          size="md"
          class="q-ml-md"
          text-color="light-blue-13"
          type="submit"
          @click="checkIsValid"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { date } from 'quasar'
import { mapActions } from "vuex"

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
    flag: {
      type: String,
      default: 'add-new'
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
      userData: {},
      isValid: false,
    }
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
    if (this.flag === 'edit-user') this.userData = { ...this.user }
  },
  methods: {
    ...mapActions("cm", ["ADD_USER", "UPDATE_USER"]),
    dateFormat (myDate) {
      return date.formatDate(myDate, "YYYY-MM-DD")
    },

    getDateYear (myDate) {
      return date.formatDate(myDate, "YYYY")
    },

    async checkIsValid () {
      await this.$refs.userForm.validate()
        .then(res => {
          if (!res) {
            this.$notifyAlert(`Wypełnij wymagane pola formularza!`, 'error')
            return false
          } else {
            return true
          }
        })
        .then(valid => {
          valid ? this.isValid = true : this.isValid = false
        })
    },

    getFormsData () {
      if (this.isValid) {
        if (this.flag === 'add-user') {
          if (Object.keys(this.userData).length > 0) {
            this.userData.nrGrobu = this.id
            if (this.userData.dtUrodzenia && this.userData.dtZgonu)
              this.userData.wiek = this.getDateYear(this.userData.dtZgonu) - this.getDateYear(this.userData.dtUrodzenia)

            this['ADD_USER'](this.userData)
            this.$notifyAlert('Dane zostały pomyślnie dodane do bazy.', 'ok')
          }
          this.resetForm()
        } else {
          if (!this.userData.wiek) {
            if (this.userData.dtUrodzenia && this.userData.dtZgonu)
              this.userData.wiek = this.getDateYear(this.userData.dtZgonu) - this.getDateYear(this.userData.dtUrodzenia)
          }
          this['UPDATE_USER']({ id: this.id, userData: this.userData })

          this.$notifyAlert('Dane zostały pomyślnie zaktualizowane.', 'ok')
          setTimeout(() => {
            this.$router.push(`/grave-show/${this.grave}`)
          }, 1500);
        }
      }
    },

    resetForm () {
      this.userData = {}
      this.$refs.userForm.reset()
      this.$refs.userForm.resetValidation()
    },
  }
}
</script>
