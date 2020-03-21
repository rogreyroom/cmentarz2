<template>
  <div class="q-pa-md">
    <q-page padding>
      <div class="row no-wrap items-center q-p-none q-mb-md">
        <h5 class="q-headline q-ma-xs text-bold text-indigo-9">
          Zmarli w roku
        </h5>
        <q-space />
        <q-input
          v-model="filter"
          :debounce="600"
          type="search"
          placeholder="Rok"
          :rules="[
            val => val.length <= 4 || 'Wprowadź poprawny rok w formie czterocyfrowej',
            val => val.length >= 4 || 'Wprowadź poprawny rok w formie czterocyfrowej'
          ]"
          round
          dense
          input-class="text-center"
        >
          <template v-slot:append>
            <q-icon
              v-if="filter === ''"
              name="search"
            />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="filter = ''"
            />
          </template>
        </q-input>

        <q-space />
        <q-btn
          v-print="'#printMe'"
          size="14px"
          round
          dense
          color="indigo-9"
          icon="print"
          class="q-mr-xs"
        />
      </div>
      <div id="printMe">
        <q-table
          :data="users"
          :columns="columns"
          :rows-per-page-options="[5, 10, 15, 20, 25, 30, 35, 50, 0]"
          :loading="loading"
          :pagination.sync="pagination"
          :filter="filter"
          :filter-method="myFilter"
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
                  :to="{ name: 'grave-show', params: { id: props.row.user.nrGrobu } }"
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
              key="imieNazwisko"
              :props="props"
            >
              {{ props.row.user.imie }} {{ props.row.user.nazwisko }}
            </q-td>
            <q-td
              key="dataUrodzenia"
              :props="props"
            >
              {{ dateFormat(props.row.user.dataUrodzenia) }}
            </q-td>
            <q-td
              key="wiek"
              :props="props"
            >
              {{ props.row.user.wiek }}
            </q-td>
            <q-td
              key="dataZgonu"
              :props="props"
            >
              {{ dateFormat(props.row.user.dtZgonu) }}
            </q-td>
            <q-td
              key="dataPochowku"
              :props="props"
            >
              {{ dateFormat(props.row.user.dtPochowku) }}
            </q-td>
          </q-tr>
        </q-table>
      </div>
    </q-page>
  </div>
</template>

<script>
import { date } from 'quasar'
import { mapState, mapActions } from "vuex";

export default {
  data () {
    return {
      printObj: {
        id: "printMe",
        popTitle: "Zmarli w roku",
      },
      pagination: {
        sortBy: "dataZgonu",
        descending: true,
        page: 1,
        rowsPerPage: 30
      },
      columns: [
        {
          name: "opcje",
          label: "",
          align: "center"
        },
        {
          name: "imieNazwisko",
          label: "Imię Nazwisko",
          align: "center",
          field: users => users.user.nazwisko,
          sortable: true,
        },
        {
          name: "dataUrodzenia",
          label: "Data urodzenia",
          align: "center",
          field: users => users.user.dtUrodzenia,
          sortable: true
        },
        {
          name: "wiek",
          label: "Wiek",
          align: "center",
          field: users => users.user.wiek,
          sortable: true
        },
        {
          name: "dataZgonu",
          label: "Data zgonu",
          align: "center",
          field: users => users.user.dtZgonu,
          filter: true,
          sortable: true
        },
        {
          name: "dataPochowku",
          label: "Data pochowku",
          align: "center",
          field: users => users.user.dtPochowku,
          sortable: true
        }
      ],
      filter: new Date().getFullYear().toString(),
      loading: false,
      notPrinting: true
    };
  },
  computed: {
    ...mapState("cm", ["users"])
  },
  created () {
    if (this.users.length === 0) {
      this["FETCH_ALL"]()
    }

  },
  methods: {
    ...mapActions("cm", ["FETCH_ALL"]),

    dateFormat (myDate) {
      return date.formatDate(myDate, "YYYY-MM-DD")
    },

    myFilter (rows, terms, cols, cellValue) {

      return rows.filter(
        row => cols.some(
          col => col.name === 'dataZgonu' ? date.formatDate(cellValue(col, row), "YYYY") === terms : null
        )
      )

    }
  }
}
</script>

<style lang="scss">
@media print {
  .q-table__bottom {
    visibility: hidden;
  }
}
</style>
