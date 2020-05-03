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
              <h5 class="col">
                Dodaj grób:
              </h5>
            </template>
            <template v-else>
              <h5 class="col">
                Edytuj grób:
                <strong class="q-ml-sm">{{ id }}</strong>
                ( {{ cmFullName }} )
              </h5>
              <div class="col-1 items-end">
                <q-btn
                  v-go-back.single=" '/' "
                  size="14px"
                  round
                  dense
                  color="indigo-9"
                  icon="arrow_back"
                  class="q-mr-sm column col-1"
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
            </template>
            <hr>
          </header>
          <grave-form
            v-if="loadGrave"
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
                  :to="{ name: 'user-add-edit', params: { id: id, flag: 'add-user' } }"
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
import { date } from 'quasar'
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
      graveID: '',
      takerID: '',
      graveData: {},
      takerData: {},
      userData: {},
      usersData: [],
      cmFullName: '',
      graveNumber: '',
      isValid: false,
      loadGrave: false
    };
  },
  computed: {
    ...mapGetters({ grave: "cm/GET_GRAVE" }),
    ...mapGetters({ taker: "cm/GET_GRAVE_TAKER" }),
    ...mapGetters({ users: "cm/GET_GRAVE_USERS" }),
    ...mapGetters({ getCemetery: "cm/GET_PARCELA" })
  },
  mounted () {
    if (this.flag === 'edit') {
      const { parcela, parcela: { parcela: cmName }, _id: graveId } = this.grave(this.id)[0]
      this.graveData = Object.assign({}, parcela)
      this.graveID = graveId
      if (Object.keys(this.graveData).length > 0)
        this.loadGrave = true

      const { thecm: { cmFullName } } = this.getCemetery(cmName)
      this.cmFullName = cmFullName

      const { taker, _id: takerId } = this.taker(this.id)[0]
      this.takerID = takerId
      this.takerData = Object.assign({}, taker)

      this.usersData = this.users(this.id)
    } else {
      this.loadGrave = true
    }
  },
  methods: {
    ...mapActions("cm", ["ADD_GRAVE", "UPDATE_GRAVE", "ADD_TAKER", "UPDATE_TAKER", "ADD_USER"]),

    getDateYear (myDate) {
      return date.formatDate(myDate, "YYYY")
    },

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
          } else {
            return true
          }
        })
        .then(valid => {
          valid ? this.isValid = true : this.isValid = false
        })
    },

    async getFormsData () {
      if (this.isValid) {
        if (this.flag === 'add') {
          this.checkOptionalGraveFields()
          this.checkOptionalTakerFields()
          this.takerData.nrGrobu = this.graveData.nrGrobu
          this['ADD_GRAVE'](this.graveData)
          this['ADD_TAKER'](this.takerData)

          if (Object.keys(this.userData).length > 0) {
            if (this.userData.dtUrodzenia && this.userData.dtZgonu)
              this.userData.wiek = this.getDateYear(this.userData.dtZgonu) - this.getDateYear(this.userData.dtUrodzenia)
            this.checkOptionalUserFields()
            this.userData.nrGrobu = this.graveData.nrGrobu
            this['ADD_USER'](this.userData)
          }

          this.$notifyAlert('Dane zostały pomyślnie dodane do bazy.', 'ok')
          this.resetForm()
        } else {
          this.checkOptionalGraveFields()
          if (this.graveData.imgFileName) delete this.graveData['imgFileName']
          this['UPDATE_GRAVE']({ id: this.graveID, graveData: this.graveData })

          if (Object.keys(this.takerData).length > 1) {
            this.checkOptionalTakerFields()
            this['UPDATE_TAKER']({ id: this.takerID, takerData: this.takerData })
          }

          this.$notifyAlert('Dane zostały pomyślnie zaktualizowane.', 'ok')
          setTimeout(() => {
            this.$router.push(`/grave-show/${this.id}`)
          }, 1500);
        }
      }
    },

    resetForm () {
      this.graveID = ''
      this.takerID = ''
      this.graveData = {}
      this.takerData = {}
      this.userData = {}
      this.usersData = []
      this.cmFullName = ''
      this.graveNumber = ''
      this.$refs.graveForm.reset()
      this.$refs.graveForm.resetValidation()
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
