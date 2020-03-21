<template>
  <div class="q-pa-md">
    <q-table
      :data="graves"
      :columns="columns"
      :pagination.sync="pagination"
      row-key="name"
    >
      <q-tr
        slot="body"
        slot-scope="props"
        class="text-center"
        :props="props"
      >
        <q-td
          key="desc"
          :props="props"
        >
          <span class="text-italic">{{ props.row.parcela.nrGrobu }}</span>
        </q-td>
        <q-td
          key="opcje"
          :props="props"
        >
          <div class="row items-center justify-between no-wrap">
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
                Pokaz
              </q-tooltip>
            </q-btn>
            <q-btn
              size="sm"
              round
              dense
              color="green"
              icon="edit"
              class="q-mr-sm"
              :to="{ name: 'grave-add-edit', params: { id: props.row.parcela.nrGrobu } }"
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
              class="q-mr-xs"
              @click="removeGrave(props.row.parcela.nrGrobu)"
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
          key="numerGrobu"
          :props="props"
        >
          {{ props.row.parcela.nrGrobu }}
        </q-td>
        <q-td
          key="rodzajGrobu"
          :props="props"
        >
          {{ props.row.parcela.rodzaj }}
        </q-td>
        <q-td
          key="statusGrobu"
          :props="props"
        >
          <span v-if="props.row.parcela.status !== 'Nie opłacony'">{{ props.row.parcela.status }}</span>
          <q-chip
            v-else
            small
            square
            color="red-2"
          >
            {{ props.row.parcela.status }}
          </q-chip>
        </q-td>
        <q-td
          key="dataZaplatyGrobu"
          :props="props"
        >
          {{ props.row.parcela.dtZaplaty }}
        </q-td>
      </q-tr>
    </q-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "PageIndex",
  data () {
    return {
      pagination: {
        sortBy: "numerGrobu",
        descending: false,
        page: 1,
        rowsPerPage: 10
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
          name: "statusGrobu",
          label: "Status",
          align: "center",
          field: graves => graves.parcela.status,
          sortable: true
        },
        {
          name: "dataZaplatyGrobu",
          label: "Dt. zapłaty",
          align: "center",
          field: graves => graves.parcela.dtZaplaty,
          sortable: true
        }
      ]
    };
  },
  computed: {
    ...mapState("cm", ["graves"])
  },
  created () {
    this["FETCH_ALL"]()
  },
  methods: {
    ...mapActions("cm", ["FETCH_ALL"]),
    removeGrave (id) {
      alert(`Chcesz usunąć grób ${id}?`)
    }
  }
};
</script>
