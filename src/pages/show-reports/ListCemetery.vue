<template>
  <div class="q-pa-md">
    <q-page padding>
      <div class="row no-wrap items-center q-p-none">
        <h5 class="q-headline q-ma-xs text-bold text-indigo-9">
          Lista cmentarzy/parceli
        </h5>
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
                  :to="{ name: 'cemetery-map', params: { id: props.row._id } }"
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
              key="cemeteryName"
              :props="props"
            >
              {{ props.row.thecm.cName }}
            </q-td>
            <q-td
              key="cemeteryFullName"
              :props="props"
            >
              {{ props.row.thecm.cmFullName }}
            </q-td>
            <q-td
              key="cemeteryEntrance"
              :props="props"
            >
              {{ props.row.thecm.wejscie }}
            </q-td>
            <q-td
              key="firstRowPosition"
              :props="props"
            >
              {{ props.row.thecm.rzad }}
            </q-td>
            <q-td
              key="firstGravePosition"
              :props="props"
            >
              {{ props.row.thecm.grob }}
            </q-td>
          </q-tr>
        </q-table>
      </div>
    </q-page>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data () {
    return {
      printObj: {
        id: "printMe",
        popTitle: "Drukowanie listy cmentarzy/parceli",
      },
      pagination: {
        sortBy: "cemeteryName",
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
          name: "cemeteryName",
          label: "Nr. cmentarza",
          align: "center",
          field: cemeteries => cemeteries.thecm.cName,
          sortable: true,
        },
        {
          name: "cemeteryFullName",
          label: "Nazwa",
          align: "center",
          field: cemeteries => cemeteries.thecm.cmFullName,
          sortable: true
        },
        {
          name: "cemeteryEntrance",
          label: "Wejście",
          align: "center"
        },
        {
          name: "firstRowPosition",
          label: "Pierwszy rząd",
          align: "center"
        },
        {
          name: "firstGravePosition",
          label: "Pierwszy grób",
          align: "center"
        }
      ],
      notPrinting: true
    };
  },
  computed: {
    ...mapState("cm", ["cemeteries"]),
  },
  created: function () {
    if (this.cemeteries.length === 0) {
      this["FETCH_ALL"]()
    }
  },
  methods: {
    ...mapActions("cm", ["FETCH_ALL"]),
  }
}

</script>

<style lang="scss">
.q-table td {
  white-space: pre-line;
  word-break: break-word;
  &::first-line {
    height: 0;
    line-height: 0;
  }
}
@media print {
  .q-table__bottom {
    visibility: hidden;
  }
}
</style>
