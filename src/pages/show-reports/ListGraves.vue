<template>
  <div class="q-pa-md">
    <q-page padding>
      <div class="row no-wrap items-center q-p-none header-height">
        <h5 class="q-headline q-ma-xs text-bold text-indigo-9">
          Lista grobów
        </h5>
        <q-space />
        <q-btn
          v-print="'#printMe'"
          size="14px"
          round
          dense
          color="indigo-9"
          icon="print"
          class="q-mr-sm"
        />
      </div>
      <div
        id="printMe"
        class="q-mt-lg"
      >
        <q-table
          :data="gravesDetails"
          :columns="columns"
          :rows-per-page-options="[5, 10, 15, 20, 25, 30, 35, 50, 0]"
          :pagination.sync="pagination"
          :wrap-cells="true"
          dense
          flat
          row-key="name"
        >
          <q-tr
            slot="body"
            slot-scope="props"
            class="text-center"
            :props="props"
          >
            <q-td
              key="opcje"
              :props="props"
            >
              <div
                class="row items-center justify-between no-wrap print-hide"
                style="max-width: 105px"
              >
                <q-btn
                  size="sm"
                  round
                  dense
                  color="blue"
                  icon="visibility"
                  class="q-mr-xs"
                  :to="{ name: 'grave-show', params: { id: props.row.parcela.nrGrobu } }"
                >
                  <q-tooltip
                    anchor="top middle"
                    self="center middle"
                    transition-show="scale"
                    transition-hide="scale"
                    content-class="bg-blue-4"
                  >
                    Pokaż
                  </q-tooltip>
                </q-btn>
              </div>
            </q-td>
            <q-td
              key="numerGrobu"
              :props="props"
            >
              {{ props.row.parcela.nrGrobu }}
            </q-td>
            <q-td
              key="statusGrobu"
              :props="props"
            >
              {{ props.row.parcela.status }}
            </q-td>
            <q-td
              key="zmarliGrobu"
              :props="props"
            >
              {{ toString(props.row.graveUsers, 'userName') }}
            </q-td>
            <q-td
              key="dataUrodzeniaZmarlych"
              :props="props"
            >
              {{ toString(props.row.graveUsers, 'userBirthday') }}
            </q-td>
            <q-td
              key="dataZgonuZmarlych"
              :props="props"
            >
              {{ toString(props.row.graveUsers, 'userDead') }}
            </q-td>
            <q-td
              key="wiekZmarlych"
              :props="props"
            >
              {{ toString(props.row.graveUsers, 'userAge') }}
            </q-td>
            <q-td
              key="opiekunGrobu"
              :props="props"
            >
              {{ toString(props.row.graveTakers, 'takerName') }}
            </q-td>
            <q-td key="uwagiWpisRecznyPoWydruku" />
          </q-tr>
        </q-table>
      </div>
    </q-page>
  </div>
</template>

<script>
import { date } from 'quasar'
import { mapState, mapActions } from "vuex";
import { isUndefined } from 'util';

export default {
  data () {
    return {
      printObj: {
        id: "printMe",
        popTitle: "Drukowanie zaległych",
      },
      pagination: {
        sortBy: "numerGrobu",
        descending: false,
        page: 1,
        rowsPerPage: 34
      },
      columns: [
        {
          name: "opcje",
          label: "",
          align: "center"
        },
        {
          name: "numerGrobu",
          label: "Nr. parceli",
          align: "center",
          field: graves => `${graves.parcela.parcela}|${graves.parcela.rzad}|${graves.parcela.grob}`,
          filter: true,
          sortable: true,
          sort: (valA, valB) => {
            let a = valA.slice(2).split('|'),
              b = valB.slice(2).split('|')
            return +a[0] > +b[0] ? 1 : +b[0] > +a[0] ? -1 : +a[1] > +b[1] ? 1 : +b[1] > +a[1] ? -1 : a[2] > +b[2] ? 1 : +b[2] > +a[2] ? -1 : 0
          }
        },
        {
          name: "statusGrobu",
          label: "Status",
          align: "center",
          field: graves => graves.parcela.status,
          sortable: true
        },
        {
          name: "zmarliGrobu",
          label: "Zmarły",
          align: "center",
          style: 'width: 138px',
        },
        {
          name: "dataUrodzeniaZmarlych",
          label: "Data urodzenia",
          align: "center",
          style: 'width: 90px',
        },
        {
          name: "dataZgonuZmarlych",
          label: "Data zgonu",
          align: "center",
          style: 'width: 90px',
        },
        {
          name: "wiekZmarlych",
          label: "Wiek",
          align: "center",
          style: 'width: 30px',
        },
        {
          name: "opiekunGrobu",
          label: "Opiekun",
          align: "center",
          style: 'width: 138px',
        },
        {
          name: "uwagiWpisRecznyPoWydruku",
          label: "Uwagi do wpisania",
        }
      ],
      notPrinting: true
    };
  },
  computed: {
    ...mapState("cm", ["gravesDetails"]),
  },
  created: function () {
    if (this.gravesDetails.length === 0) {
      this["FETCH_ALL"]()
    }
  },
  methods: {
    ...mapActions("cm", ["FETCH_ALL"]),

    dateFormat (myDate) {
      return date.formatDate(myDate, "YYYY-MM-DD")
    },

    toString (arr, option) {
      let newArr = arr.map((val) => {
        switch (option) {
          case 'userName':
            return !isUndefined(val.user.imie) && !isUndefined(val.user.nazwisko) ? `${val.user.imie} ${val.user.nazwisko}` : 'brak danych'
          case 'userBirthday':
            return !isUndefined(val.user.dtUrodzenia) ? this.dateFormat(`${val.user.dtUrodzenia}`) : 'brak danych'
          case 'userDead':
            return !isUndefined(val.user.dtZgonu) ? this.dateFormat(`${val.user.dtZgonu}`) : 'brak danych'
          case 'userAge':
            return !isUndefined(val.user.wiek) ? `${val.user.wiek}` : 'bd';
          case 'takerName':
            return !isUndefined(val.taker.imie) && !isUndefined(val.taker.nazwisko) ? `${val.taker.imie} ${val.taker.nazwisko}` : null
          default:
            return []
        }
      })

      return newArr.toString().replace(/,/ig, '\n').trim()
    }
  }
}
</script>
