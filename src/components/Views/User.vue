<template>
  <section>
    <div class="row q-pa-sm q-gutter-sm">
      <h5>
        Dane osoby zmarłej
        <q-btn
          :to="{ name: 'user-add-edit', params: { id: id, flag: 'add' } }"
          flat
          icon="add"
          class="q-ml-md"
          text-color="light-blue-13"
        />
      </h5>
    </div>
    <div
      v-for="{_id, user} in users"
      :key="_id"
      class="row q-pa-sm q-gutter-sm"
    >
      <single-user
        :id="_id"
        :user="user"
      />
    </div>
  </section>
</template>

<script>
import SingleUser from './SingleUser'

export default {
  components: {
    'single-user': SingleUser
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    users: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
};
</script>
