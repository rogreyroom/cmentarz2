<template>
  <section>
    <div class="row q-gutter-sm">
      <q-tab-panel
        class="row full-width justify-center"
        name="name"
      >
        <div class="row q-pa-lg bg-grey-2 full-width">
          <div class="col-8 wider">
            <h5 class="q-mt-none">
              Cmentarz: {{ fullName }}
              <q-btn
                :to="{ name: 'cemetery-add-edit', params: { id: id, flag: 'edit', cemetery: cm } }"
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
                @click="removeCemetery(id)"
              />
            </h5>
            <div class="row">
              <p class="full-width text-subtitle1">
                Ilość grobów na cmentarzu: <strong class="q-ml-md">{{ allGravesCount(name) }}</strong>
              </p>
              <p class="full-width text-subtitle1">
                Ilość grobów opłaconych na cmentarzu: <strong class="q-ml-md">{{ allPaidGravesCount(name) }}</strong>
              </p>
              <p class="full-width text-subtitle1">
                Ilość grobów nie opłaconych na cmentarzu: <strong class="q-ml-md">{{ allUnpaidGravesCount(name) }}</strong>
              </p>
              <p class="full-width text-subtitle1">
                Ilość grobów pustych na cmentarzu: <strong class="q-ml-md">{{ allEmptyGravesCount(name) }}</strong>
              </p>
            </div>
          </div>
          <div class="col">
            <h5 class="q-mt-none">
              Legenda:
            </h5>
            <div class="row full-width">
              <q-icon
                name="check_box_outline_blank"
                class="bg-light-green-9 text-light-green-9 shadow-2 q-ma-xs"
                size="30px"
              />
              <span class="text-subtitle1 q-ml-md self-center">Opłacone</span>
            </div>
            <div class="row full-width">
              <q-icon
                name="check_box_outline_blank"
                class="bg-red-9 text-red-9 shadow-2 q-ma-xs"
                size="30px"
              />
              <span class="text-subtitle1 q-ml-md self-center">Nie opłacone</span>
            </div>
            <div class="row full-width">
              <q-icon
                name="check_box_outline_blank"
                class="bg-brown-6 text-brown-6 shadow-2 q-ma-xs"
                size="30px"
              /><span class="text-subtitle1 q-ml-md self-center">Puste</span>
            </div>
            <div class="row full-width">
              <q-icon
                name="check_box_outline_blank"
                class="bg-light-blue-13 text-light-blue-13 shadow-2 q-ma-xs"
                size="30px"
              /><span class="text-subtitle1 q-ml-md self-center">Wybrany</span>
            </div>
          </div>
        </div>
        <div class="row full-width justify-center">
          <hr>
          <div class="q-pa-m full-width">
            <div class="row ">
              <div
                v-for="cmRow in cemeteryRows"
                :key="cmRow"
                class="row full-width items-center"
              >
                <div class="col-1">
                  <div class="row q-mb-xs q-mr-lg text-subtitle1 justify-end">
                    Rząd: {{ cmRow }}
                  </div>
                </div>
                <div class="col">
                  <div
                    class="row bg-grey-2 q-mb-xs"
                    :class="entrance === 'wejscieRight' ? 'justify-end' : 'justify-start'"
                  >
                    <div
                      v-for="{parcela: { nrGrobu, grob, status }} in getGravesOfTheRow(name, cmRow)"
                      :key="nrGrobu"
                    >
                      <template v-if="flag === 'show-grave' && cmRow === grave.r && grob === grave.g && name === grave.cm">
                        <q-btn
                          :to="{ name: 'grave-show', params: { id: nrGrobu } }"
                          :label="grob"
                          class="grave"
                          color="light-blue-13"
                          dense
                        />
                      </template>
                      <template v-else>
                        <q-btn
                          :to="{ name: 'grave-show', params: { id: nrGrobu } }"
                          :label="grob"
                          class="grave"
                          :color="setColor(status)"
                          dense
                        />
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div
            class="row full-width"
            :class="graveYardEntrance()"
          >
            <div class="text-h6 q-ml-lg q-mr-lg">
              Wejście
              <q-icon
                name="lens"
                class="text-red-14 q-ma-xs"
                size="30px"
              />
            </div>
          </div>
          <hr>
        </div>
      </q-tab-panel>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    flag: {
      type: String,
      default: ''
    },
    cm: {
      type: Object,
      default: function () {
        return {}
      }
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
      fullName: '',
      entrance: '',
      firstGraveRow: '',
      firstGrave: '',
      cemeteryRows: [],
    };
  },
  computed: {
    ...mapGetters({ allGravesCount: "cm/GET_ALL_GRAVES_COUNT" }),
    ...mapGetters({ allPaidGravesCount: "cm/GET_ALL_PAID_GRAVES_COUNT" }),
    ...mapGetters({ allUnpaidGravesCount: "cm/GET_ALL_UNPAID_GRAVES_COUNT" }),
    ...mapGetters({ allEmptyGravesCount: "cm/GET_ALL_EMPTY_GRAVES_COUNT" }),
    ...mapGetters({ uniqueCemeteryRows: "cm/GET_UNIQUE_CEMETERY_ROWS" }),
    ...mapGetters({ gravesOfTheRow: "cm/GET_CEMETERY_ROW_GRAVES" })
  },
  mounted () {
    const { cmFullName, wejscie, rzad, grob } = this.cm
    this.fullName = cmFullName
    this.entrance = wejscie
    this.firstGraveRow = rzad
    this.firstGrav = grob
    this.cemeteryRows = this.uniqueCemeteryRows(this.name)

    if (rzad === 'rzadBottom') this.cemeteryRows.reverse()
  },
  methods: {
    ...mapActions("cm", ["REMOVE_CEMETERY"]),

    setColor (status) {
      switch (status) {
        case 'Opłacony':
          return 'light-green-9'
        case 'Puste':
          return 'brown-6'
        case 'Nie opłacony':
          return 'red-9'
      }
    },

    graveYardEntrance () {
      switch (this.entrance) {
        case 'wejscieLeft':
          return 'justify-start'
        case 'wejscieRight':
          return 'justify-end'
      }
    },

    getGravesOfTheRow (name, cmRow) {
      const gravesOfRow = this.gravesOfTheRow(name, cmRow)
      if (this.firstGrav === 'grobRightBottom' || this.firstGrav === 'grobRightTop') gravesOfRow.reverse()
      return gravesOfRow
    },

    async removeCemetery (id) {
      await this.REMOVE_CEMETERY(id)
      this.$notifyAlert('Dane zostały pomyślnie usunięte z bazy.', 'ok')
      this.$router.push({ name: 'cemetery-full-list' })
    }
  }
}
</script>

<style lang="scss" scoped>
hr {
  width: 100%;
}
.grave {
  padding: 0 3px;
  font-size: 12px;
  margin: 2px 3px;
}
</style>
