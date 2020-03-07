<template>
  <div class="q-pa-md">
    <q-page padding>
      <div class="row q-pa-sm q-gutter-sm">
        <h5>
          Edytuj grób:
          <strong class="q-ml-sm">{{ id }}</strong>
          (Cmantarz dolny)
        </h5>
      </div>
      <hr>
      <edit-grave-form :id="id" />
      <hr>
      <!-- edit-grave-taker-form -->
      <hr>
      <!-- list-grave-users -->
    </q-page>
  </div>
</template>

<script>

import EditGrave from '../components/Forms/EditGrave'

export default {
  components: {
    'edit-grave-form': EditGrave
  },
  data () {
    return {
      id: this.$route.params.id,
    };
  },
};
</script>

<style></style>
