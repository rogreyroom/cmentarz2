<template>
  <div class="q-pa-md">
    <q-page padding>
      <div class="row no-wrap items-center q-p-none">
        <h5 class="q-headline q-ma-xs text-bold text-indigo-9">
          Groby nie opłacone
        </h5>
        <q-space />
        <q-btn v-print="'#printMe'" size="14px" round dense color="indigo-9" icon="print" class="q-mr-xs" />
      </div>
      <div id="printMe">
        <q-table
          :data="graves"
          :columns="columns"
          :rows-per-page-options="[5, 10, 15, 20, 25, 30, 35, 50, 0]"
          :pagination.sync="pagination"
          dense
          flat
          row-key="name"
        >
          <q-tr slot="body" slot-scope="props" class="text-center" :props="props">
            <q-td key="desc" :props="props">
              <span class="text-italic">{{ props.row.parcela.nrGrobu }}</span>
            </q-td>
            <q-td key="opcje" :props="props">
              <div class="row items-center justify-between no-wrap print-hide" style="max-width: 105px">
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
            <q-td key="numerGrobu" :props="props">{{ props.row.parcela.nrGrobu }}</q-td>
            <q-td key="rodzajGrobu" :props="props">{{ props.row.parcela.rodzaj }}</q-td>
            <q-td key="dataZaplatyGrobu" :props="props">{{ props.row.parcela.dtZaplaty }}</q-td>
            <q-td key="dataOplatyGrobu" :props="props">{{ props.row.parcela.dtOplaty }}</q-td>
            <q-td key="okresOplatyGrobu" :props="props">{{ props.row.parcela.okres }}</q-td>
            <q-td key="opiekunGrobu" :props="props">{{ props.row.parcela.okres }}</q-td>
          </q-tr>
        </q-table>
      </div>
    </q-page>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        printObj: {
          id: "printMe",
          popTitle: "Drukowanie zaległych",
          extraCss: "https://www.google.com,https://www.google.com"
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
            field: graves => `${graves.parcela.parcela}${graves.parcela.rzad}${graves.parcela.grob}`,
            filter: true,
            sortable: true,
            sort: (valA, valB) => {
              // slice(2) removes 'cm' from cemetery name
              // TODO: sorting still not working as it should - R10 is after all cm's
              let a = valA.slice(2),
                  b = valB.slice(2);
              return isNaN(a - b) ? (a === b ? 0 : a < b ? -1 : 1) : a - b;
            }
          },
          {
            name: "rodzajGrobu",
            label: "Rodzaj",
            align: "center",
            field: graves => graves.parcela.rodzaj,
            sortable: true
          },
          {
            name: "dataZaplatyGrobu",
            label: "Dt. zapłaty",
            align: "center",
            field: graves => graves.parcela.dtZaplaty,
            sortable: true
          },
          {
            name: "dataOplatyGrobu",
            label: "Dt. opłaty",
            align: "center",
            field: graves => graves.parcela.dtOplaty,
            sortable: true
          },
          {
            name: "okresOplatyGrobu",
            label: "Okres",
            align: "center",
            field: graves => graves.parcela.okres,
            sortable: true
          },
          {
            name: "opiekunGrobu",
            label: "Opiekun",
            align: "center",
            field: graves => graves.parcela.okres,
            sortable: true
          }
        ],
        notPrinting: true
      };
    },
    computed: {
      ...mapGetters({ graves: "cm/GET_UNPAID_GRAVES" })
    },
    methods: {}
  };
</script>

<style lang="scss">
  @media print {
    .q-table__bottom {
      visibility: hidden;
    }
  }
</style>
