<template>
  <div class="q-pa-md">
    <q-page padding>
      <header class="row q-pa-sm q-gutter-sm">
        <template v-if="flag === 'add-user'">
          <h5>
            Dodaj zmarłego do grobu:
            <strong class="q-ml-sm">{{ grave }}</strong>
          </h5>
        </template>
        <template v-else>
          <h5>
            Edytuj dane zmarłego z grobu:
            <strong class="q-ml-sm">{{ grave }}</strong>
          </h5>
        </template>
        <hr>
      </header>
      <section>
        <user-form
          :id="id"
          :grave="grave"
          :user="user"
          :flag="flag"
        />
      </section>
    </q-page>
  </div>
</template>

<script>
import User from '../../components/Forms/User'

export default {
  components: {
    'user-form': User
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    grave: {
      type: String,
      default: ''
    },
    user: {
      type: Object,
      default: function () {
        return {}
      }
    },
    flag: {
      type: String,
      default: 'add-user'
    },
  }
};
</script>
