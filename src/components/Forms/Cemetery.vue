<template>
  <div class="row q-pa-sm q-gutter-sm">
    <q-form
      ref="cemeteryForm"
      @submit.prevent="addUpdateCemetery"
    >
      <section class="row full-width">
        <div class="row full-width q-ma-md">
          <div class="row full-width">
            <p><strong>Nazwa cmentarza/parceli:</strong></p>
          </div>
          <div class="row">
            <q-input
              ref="cmFullName"
              v-model="cmFullName"
              type="text"
              outlined
              autofocus
              label="Pełna nazwa cmentarza"
              size="50%"
              :rules="[val => !!val || 'Pole jest wymagane']"
            />
          </div>
        </div>
      </section>
      <section class="row full-width justify-center q-pa-md">
        <div class="row full-width justify-center q-pa-md">
          <div class="column col-4 justify-between q-pa-md cemetery-schema-height ">
            <div class="row full-width justify-end">
              <span>
                <q-radio
                  v-model="rzad"
                  val="rzadTop"
                  label="1-szy rząd"
                  left-label
                  color="light-blue-13"
                />
              </span>
            </div>
            <div class="row full-width justify-end">
              <span>
                <q-radio
                  v-model="rzad"
                  val="rzadBottom"
                  label="1-szy rząd"
                  left-label
                  color="light-blue-13"
                />
              </span>
            </div>
          </div>
          <div class="column col-8 relative-position cemetery-schema-border cemetery-schema-height">
            <div
              v-if="rzad === 'rzadTop'"
              class="row full-width justify-between items-center q-pa-md absolute-top"
            >
              <span>
                <q-radio
                  v-model="grob"
                  val="grobLeftTop"
                  label="1-szy grób"
                  color="light-blue-13"
                />
              </span>
              <span>
                <q-radio
                  v-model="grob"
                  val="grobRightTop"
                  label="1-szy grób"
                  left-label
                  color="light-blue-13"
                />
              </span>
            </div>
            <div class="absolute-center">
              <strong>CMENTARZ</strong>
            </div>
            <div
              v-if="rzad === 'rzadBottom'"
              class="row full-width justify-between items-center q-pa-md absolute-bottom"
            >
              <span>
                <q-radio
                  v-model="grob"
                  val="grobLeftBottom"
                  label="1-szy grób"
                  color="light-blue-13"
                />
              </span>
              <span>
                <q-radio
                  v-model="grob"
                  val="grobRightBottom"
                  label="1-szy grób"
                  left-label
                  color="light-blue-13"
                />
              </span>
            </div>
          </div>
        </div>
        <div class="row full-width justify-center q-pa-md">
          <div class="column col-4 justify-center q-pa-md ">
            <div class="row full-width justify-end ">
              <strong>Wejście</strong>
            </div>
          </div>
          <div class="column col-8 relative-position q-pa-md ">
            <div class="row full-width justify-between items-center">
              <span>
                <q-radio
                  v-model="wejscie"
                  val="wejscieLeft"
                  label="po lewej"
                  color="light-blue-13"
                />
              </span>
              <span>
                <q-radio
                  v-model="wejscie"
                  val="wejscieRight"
                  label="po prawej"
                  left-label
                  color="light-blue-13"
                />
              </span>
            </div>
          </div>
        </div>
      </section>
      <div class="row full-width">
        <q-btn
          unelevated
          outline
          :label="flag === 'add' ? 'Dodaj' : 'Zmień'"
          size="md"
          class="q-ml-md"
          text-color="light-blue-13"
          type="submit"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    flag: {
      type: String,
      default: 'add'
    },
    cemetery: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      cName: '',
      cmFullName: '',
      rzad: '',
      grob: '',
      wejscie: ''
    }
  },
  computed: {
    ...mapGetters({ cemeteryCount: "cm/GET_CEMETERY_COUNT" })
  },
  created () {
    if (this.flag === 'edit') {
      const { cName, cmFullName, rzad, grob, wejscie } = this.cemetery
      this.cmFullName = cmFullName
      this.cName = cName
      this.rzad = rzad
      this.grob = grob
      this.wejscie = wejscie
    }
  },
  methods: {
    ...mapActions("cm", ["ADD_CEMETERY", "UPDATE_CEMETERY"]),
    addUpdateCemetery () {
      this.$refs.cemeteryForm.validate()
        .then(success => {
          if (!success) return this.$notifyAlert('Nazwa cmentarza jest wymagana!', 'error')
          if (!this.rzad) return this.$notifyAlert('Wybierz położenie pierwszego rzędu na cmentarzu/parceli!', 'error')
          if (!this.grob) return this.$notifyAlert('Wybierz położenie pierwszego grobu na cmentarzu/parceli!', 'error')
          if (!this.wejscie) return this.$notifyAlert('Wybierz położenie wejścia na cmentarz/parcelę!', 'error')
          return success
        })
        .then(val => {
          if (!val) return val
          if (this.flag !== 'edit') {
            let cmCount = this.cemeteryCount
            ++cmCount
            this.cName = `cm${cmCount}`
          }
          const cmData = {
            cName: this.cName,
            cmFullName: this.cmFullName,
            wejscie: this.wejscie,
            rzad: this.rzad,
            grob: this.grob
          }
          if (this.flag !== 'edit') {
            return this["ADD_CEMETERY"](cmData)
          } else {
            return this["UPDATE_CEMETERY"]({ id: this.id, cmData: cmData })
          }
        })
        .then(res => {
          if (res && res.hasOwnProperty('error')) return this.$notifyAlert(res.error.message, 'error')
          if (this.flag !== 'edit') {
            this.$notifyAlert('Dane zostały pomyślnie dodane do bazy.', 'ok')
          } else {
            this.$notifyAlert('Dane zostały pomyślnie zmienione w bazie.', 'ok')
          }
          this.resetForm()
        })
        .catch(err => {
          this.$notifyAlert(`Błąd formularza!\n ${err}`, 'error')
        })
    },
    resetForm () {
      this.cName = ''
      this.cmFullName = ''
      this.rzad = false
      this.grob = false
      this.wejscie = false
      this.$refs.cemeteryForm.reset()
      this.$refs.cemeteryForm.resetValidation()
    }
  }
}
</script>

<style lang="scss" scoped>
.cemetery-schema-border {
  border: 1px solid $grey-5;
  border-radius: 4px;
}
.cemetery-schema-height {
  min-height: 200px;
  max-height: 200px;
}
</style>
