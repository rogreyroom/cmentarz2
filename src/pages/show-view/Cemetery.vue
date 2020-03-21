<template>
  <div class="q-pa-md">
    <q-page padding>
      <cemetery
        :id="id"
        :grave="grave"
        :cemetery="cemeteryData"
      />
    </q-page>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Cemetery from '../../components/Views/Cemetery'

export default {
  components: {
    'cemetery': Cemetery
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    grave: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      cemeteryData: {}
    };
  },
  computed: {
    ...mapGetters({ cemetery: "cm/GET_PARCELA" }),
  },
  mounted () {
    this.cemeteryData = this.cemetery(this.id)
  }
};
</script>

