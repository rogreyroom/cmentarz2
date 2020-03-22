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
          :data="cemeteries"
          :columns="columns"
          :rows-per-page-options="[5, 10, 15, 20, 25, 30, 35, 50, 0]"
          :pagination.sync="pagination"
          :wrap-cells="true"
          dense
          flat
          row-key="name"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
            <q-tr
              class="text-center"
              :props="props"
            >
              <q-td auto-width>
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
                    class="q-mr-sm"
                    :to="{ name: 'cemetery-map', params: { name: props.row.thecm.cName } }"
                  >
                    <q-tooltip
                      anchor="top middle"
                      self="center middle"
                      transition-show="scale"
                      transition-hide="scale"
                      content-class="bg-blue-4"
                    >
                      Pokaż {{ props.row.thecm.cName }}
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    size="sm"
                    round
                    dense
                    color="green"
                    icon="edit"
                    class="q-mr-sm"
                    :to="{ name: 'cemetery-add-edit', params: { id: props.row._id, flag: 'edit', cemetery: props.row.thecm } }"
                  >
                    <q-tooltip
                      anchor="top middle"
                      self="center middle"
                      transition-show="scale"
                      transition-hide="scale"
                      content-class="bg-green-4"
                    >
                      Edytuj
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    size="sm"
                    round
                    dense
                    color="red"
                    icon="remove"
                    class="q-mr-sm"
                    @click="removeCemetery(props.row._id)"
                  >
                    <q-tooltip
                      anchor="top middle"
                      self="center middle"
                      transition-show="scale"
                      transition-hide="scale"
                      content-class="bg-red-4"
                    >
                      Usuń
                    </q-tooltip>
                  </q-btn>
                </div>
              </q-td>
              <q-td
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.value }}
              </q-td>
            </q-tr>
          </template>
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
          align: "center",
          field: cemeteries => {
            switch (cemeteries.thecm.wejscie) {
              case 'wejscieLeft':
                return 'Po lewej'
              case 'wejscieRight':
                return 'Po prawej'
            }
          }
        },
        {
          name: "firstRowPosition",
          label: "Pierwszy rząd",
          align: "center",
          field: cemeteries => {
            switch (cemeteries.thecm.rzad) {
              case 'rzadTop':
                return 'Na górze'
              case 'rzadBottom':
                return 'Na dole'
            }
          }
        },
        {
          name: "firstGravePosition",
          label: "Pierwszy grób",
          align: "center",
          field: cemeteries => {
            switch (cemeteries.thecm.grob) {
              case 'grobLeftTop':
                return 'U góry po lewej'
              case 'grobRightTop':
                return 'U góry po prawej'
              case 'grobLeftBottom':
                return 'Na dole po lewej'
              case 'grobRightBottom':
                return 'Na dole po prawej'
            }
          }
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
    removeCemetery (id) {
      // eslint-disable-next-line no-console
      console.log(id);
    }
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
