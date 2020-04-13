<template>
  <div class="q-pa-md">
    <q-page padding>
      <q-form
        ref="graveForm"
        greedy
        @submit.prevent="getFormsData"
      >
        <section>
          <header class="row q-pa-sm q-gutter-sm">
            <template v-if="flag === 'add'">
              <h5>
                Dodaj grób:
              </h5>
            </template>
            <template v-else>
              <h5>
                Edytuj grób:
                <strong class="q-ml-sm">{{ id }}</strong>
                ( {{ cmFullName }} )
              </h5>
            </template>
            <hr>
          </header>
          <grave-form
            :id="id"
            :grave="graveData"
            :flag="flag"
            :cemetery="cmFullName"
          />
        </section>
        <hr>
        <section>
          <div class="row q-pa-sm q-gutter-sm">
            <h5>
              Dane opiekuna grobu:
            </h5>
          </div>
          <taker-form
            :id="id"
            :taker="takerData"
            :flag="flag"
          />
        </section>
        <hr>
        <section>
          <div class="row q-pa-sm q-gutter-sm">
            <h5>
              Dane osoby zmarłej:
              <template v-if="flag === 'edit'">
                <q-btn
                  :to="{ name: 'user-add-edit', params: { id: id, flag: 'add-new' } }"
                  flat
                  icon="add"
                  class="q-ml-md"
                  text-color="light-blue-13"
                />
              </template>
            </h5>
          </div>
          <template v-if="flag === 'add'">
            <user-form
              :id="id"
              :flag="flag"
              :user="userData"
            />
          </template>
          <template v-else>
            <div
              v-for="{_id, user} in usersData"
              :key="_id"
              class="row q-pa-sm q-gutter-sm"
            >
              <single-user
                :id="id"
                :user="user"
              />
            </div>
          </template>
        </section>
        <hr v-if="flag === 'edit'">
        <div class="row full-width">
          <q-btn
            outline
            :label="flag === 'add' ? 'Dodaj' : 'Zmień'"
            size="md"
            class="q-ml-md"
            text-color="light-blue-13"
            type="submit"
            @click="checkIsValid"
          />
        </div>
      </q-form>
    </q-page>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Grave from '../../components/Forms/Grave'
import Taker from '../../components/Forms/Taker'
import User from '../../components/Forms/User'
import SingleUser from '../../components/Views/SingleUser'

export default {
  components: {
    'grave-form': Grave,
    'taker-form': Taker,
    'user-form': User,
    'single-user': SingleUser
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
  },
  data () {
    return {
      graveData: {},
      takerData: {},
      userData: {},
      usersData: [],
      cmFullName: '',
      graveNumber: '',
      isValid: false
    };
  },
  computed: {
    ...mapGetters({ grave: "cm/GET_GRAVE" }),
    ...mapGetters({ taker: "cm/GET_GRAVE_TAKER" }),
    ...mapGetters({ users: "cm/GET_GRAVE_USERS" }),
    ...mapGetters({ getCemetery: "cm/GET_PARCELA" })
  },
  created () {

  },
  mounted () {
    if (this.flag === 'edit') {
      const { parcela, parcela: { parcela: cmName } } = this.grave(this.id)[0]
      this.graveData = parcela
      const { thecm: { cmFullName } } = this.getCemetery(cmName)
      this.cmFullName = cmFullName
      const { taker } = this.taker(this.id)[0]
      this.takerData = taker
      this.usersData = this.users(this.id)
    }
  },
  methods: {
    ...mapActions("cm", ["ADD_GRAVE", "UPDATE_GRAVE", "ADD_TAKER", "UPDATE_TAKER", "ADD_USER", "UPDATE_USER"]),
    async checkIsValid () {
      await this.$refs.graveForm.validate()
        .then(res => {
          if (!res) {
            this.$notifyAlert(`Wypełnij wymagane pola formularza!`, 'error')
            return false
          }
          if (this.flag === 'add') {
            if (!this.graveData.hasOwnProperty('nrGrobu')) {
              this.graveNumber = `P${this.graveData.parcela}|R${this.graveData.rzad}|G${this.graveData.grob}`
            } else {
              this.graveNumber = this.graveData.nrGrobu
            }

            const graveExists = this.grave(this.graveNumber).length > 0 ? true : false
            if (graveExists) {
              this.$notifyAlert('Grób o tym numerze już istnieje!', 'error')
              return false
            } else {
              this.graveData.nrGrobu = this.graveNumber
              return true
            }
          }
        })
        .then(valid => {
          valid ? this.isValid = true : this.isValid = false
        })
    },

    async getFormsData () {
      // TODO: Every set ( grave, taker and user ) need to have nrGrobu
      // TODO: Remove imgFileName from graves => delete grave.imgFileName
      // TODO: Send data to api db actions and update state
      // TODO: Check if this show-form page is used to handle grave editing

      if (this.isValid) {
        if (this.flag === 'add') {
          this.checkOptionalGraveFields()
          this.checkOptionalTakerFields()
          this.takerData.nrGrobu = this.graveData.nrGrobu
          this['ADD_GRAVE'](this.graveData)
          this['ADD_TAKER'](this.takerData)

          if (Object.keys(this.userData).length > 0) {
            this.checkOptionalUserFields()
            this.userData.nrGrobu = this.graveData.nrGrobu
            this['ADD_USER'](this.graveData)
          }

          this.$notifyAlert('Dane zostały pomyślnie dodane do bazy.', 'ok')
          // TODO: Clear form
        }
      }

    },
    checkOptionalGraveFields () {
      const graveOptionalFields = [
        'okres',
        'dtOplaty',
        'dtZaplaty',
        'ext',
        'uwagi'
      ]
      graveOptionalFields.map(el => {
        if (!this.graveData.hasOwnProperty(el)) this.graveData[el] = ''
      })
    },
    checkOptionalTakerFields () {
      const graveOptionalFields = [
        'imie',
        'nazwisko',
        'adres',
        'tel',
        'email',
        'uwagi'
      ]
      graveOptionalFields.map(el => {
        if (!this.takerData.hasOwnProperty(el)) this.takerData[el] = ''
      })
    },
    checkOptionalUserFields () {
      const graveOptionalFields = [
        'imie',
        'nazwisko',
        'nazwiskoRodowe',
        'wiek',
        'stanCywilny',
        'imieMatki',
        'nazwiskoMatki',
        'imieOjca',
        'nazwiskoOjca',
        'dtUrodzenia',
        'miejsceUrodzenia',
        'dtZgonu',
        'miejsceZgonu',
        'dtPochowku',
        'miejscePochowku'
      ]
      graveOptionalFields.map(el => {
        if (!this.userData.hasOwnProperty(el)) this.userData[el] = ''
      })
    },
  },
};
</script>

<style></style>
