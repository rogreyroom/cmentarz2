<template>
  <div class="q-pa-md">
    <q-page padding>
      <header class="row q-pa-sm q-gutter-sm">
        <template v-if="flag === 'add'">
          <h5>
            Dodaj opiekuna grobu:
            <strong class="q-ml-sm">{{ id }}</strong>
          </h5>
        </template>
        <template v-else>
          <h5>
            Edytuj opiekuna grobu:
            <strong class="q-ml-sm">{{ id }}</strong>
          </h5>
        </template>
        <hr>
      </header>
      <section>
        <taker-form
          :id="id"
          :taker="taker"
          :flag="flag"
        />
      </section>
    </q-page>
  </div>
</template>

<script>
import Taker from '../../components/Forms/Taker'

export default {
  components: {
    'taker-form': Taker
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    taker: {
      type: Object,
      default: function () {
        return {}
      }
    },
    flag: {
      type: String,
      default: 'add'
    },
  }
};
</script>

<style></style>
