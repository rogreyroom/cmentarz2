<template>
  <section class="q-pa-md">
    <q-page padding>
      <div class="row no-wrap items-center q-p-none">
        <h5 class="q-headline q-ma-xs text-bold text-indigo-9">
          Wyniki wyszukiwania
        </h5>
        <q-space />
        <q-btn
          v-go-back.single=" '/' "
          size="14px"
          round
          dense
          color="indigo-9"
          icon="arrow_back"
          class="q-mr-sm"
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
      <div class="q-mt-lg">
        <q-table
          :data="result"
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
                    :to="{ name: 'grave-show', params: { id: props.row.user.nrGrobu } }"
                  >
                    <q-tooltip
                      anchor="top middle"
                      self="center middle"
                      transition-show="scale"
                      transition-hide="scale"
                      content-class="bg-blue-4"
                    >
                      Pokaż {{ props.row.user.nrGrobu }}
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
  </section>
</template>

<script>
export default {
  props: {
    result: {
      type: Array,
      default: function () {
        return []
      }
    },
  },
  data () {
    return {
      pagination: {
        sortBy: "graveNumber",
        descending: false,
        page: 1,
        rowsPerPage: 34
      },
      columns: [
        {
          name: "graveNumber",
          label: "Nr. grobu",
          align: "center",
          field: result => result.user.nrGrobu,
          sortable: true,
        },
        {
          name: "firstName",
          label: "Imię",
          align: "center",
          field: result => result.user.imie,
          sortable: true
        },
        {
          name: "secondName",
          label: "Nazwisko",
          align: "center",
          field: result => result.user.nazwisko,
          sortable: true
        },
        {
          name: "age",
          label: "Wiek",
          align: "center",
          field: result => result.user.wiek,
          sortable: true
        },
        {
          name: "birthDate",
          label: "Data urodzenia",
          align: "center",
          field: result => result.user.dtUrodzenia,
          sortable: true
        },
        {
          name: "deathDate",
          label: "Data zgonu",
          align: "center",
          field: result => result.user.dtZgonu,
          sortable: true
        }
      ],
    }
  },
  mounted () {
  },
}
</script>

<style>
</style>
