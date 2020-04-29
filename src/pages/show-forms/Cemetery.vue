<template>
  <div class="q-pa-md">
    <q-page padding>
      <header class="row q-pa-sm q-gutter-sm">
        <template v-if="flag === 'add'">
          <h5 class="q-mb-sm">
            Dodaj cmentarz
          </h5>
          <p class="row full-width q-gutter-sm">
            <strong>Wybierz położenie kluczowych elementów cmentarza</strong>
          </p>
        </template>
        <template v-else>
          <h5>
            Edytuj cmentarz:
            <strong class="q-ml-sm">{{ cemeteryFullName }}</strong>
          </h5>
        </template>
        <hr>
      </header>
      <section>
        <cemetery-form
          :id="id"
          :cemetery="cemetery"
          :flag="flag"
        />
      </section>
    </q-page>
  </div>
</template>

<script>
import Cemetery from '../../components/Forms/Cemetery'

export default {
  components: {
    'cemetery-form': Cemetery
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    cemetery: {
      type: Object,
      default: function () {
        return {}
      }
    },
    flag: {
      type: String,
      default: 'add'
    },
  },
  data () {
    return {
      cemeteryFullName: ''
    }
  },
  mounted () {
    if (this.flag === 'edit') {
      const { cmFullName } = this.cemetery
      this.cemeteryFullName = cmFullName
    }
  },
};
</script>

<style></style>
