<template>
  <section>
    <div class="row q-pa-sm q-gutter-sm">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey full-width"
        active-color="indigo-9"
        indicator-color="indigo-9"
        align="justify"
        narrow-indicator
      >
        <q-tab
          v-for="{_id, thecm: cm } in cemeteries"
          :key="_id"
          :name="cm.cName"
          :label="cm.cmFullName"
          class="row q-pa-sm q-ma-sm q-gutter-sm"
        />
      </q-tabs>
      <q-tab-panels
        v-model="tab"
        animated
      >
        <cemetery-details
          v-for="{_id, thecm: cm } in cemeteries"
          :id="_id"
          :key="_id"
          :name="cm.cName"
          :cm="cm"
        />
      </q-tab-panels>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Cemetery from '../../components/Views/Cemetery'

export default {
  components: {
    'cemetery-details': Cemetery
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      tab: this.name || 'cm1',
    }
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
