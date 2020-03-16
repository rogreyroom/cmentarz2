<template>
  <div class="q-pa-md">
    <q-page padding>
      <header class="row q-pa-sm q-gutter-sm">
        <h5>
          Edytuj opiekuna grobu:
          <strong class="q-ml-sm">{{ id }}</strong>
        </h5>
        <hr>
      </header>
      <section>
        <taker-form
          :id="id"
          :taker="taker"
          flag="edit"
        />
      </section>
    </q-page>
  </div>
</template>

<script>
import Taker from '../components/Forms/Taker'

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
    }
  }
};
</script>

<style></style>
