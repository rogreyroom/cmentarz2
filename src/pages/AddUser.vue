<template>
  <div class="q-pa-md">
    <q-page padding>
      <header class="row q-pa-sm q-gutter-sm">
        <h5>
          Dodaj zmarłego do grobu:
          <strong class="q-ml-sm">{{ id }}</strong>
        </h5>
        <hr>
      </header>
      <section>
        <user-form
          :id="id"
          :user="user"
          flag="edit"
        />
      </section>
    </q-page>
  </div>
</template>

<script>
import User from '../components/Forms/User'

export default {
  components: {
    'user-form': User
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    user: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
};
</script>

<style></style>
