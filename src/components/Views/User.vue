<template>
  <section>
    <div class="row q-pa-sm q-gutter-sm">
      <h5>
        Dane osoby zmarłej
        <q-btn
          :to="{ name: 'user-add-edit', params: { grave: id, flag: 'add-user' } }"
          flat
          icon="add"
          class="q-ml-md"
          text-color="light-blue-13"
        />
      </h5>
    </div>
    <div class="row q-pa-sm q-gutter-sm">
      <single-user
        v-for="{_id, user} in users"
        :id="_id"
        :key="_id"
        :grave="id"
        :user="user"
        @update-users="updateUsers"
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
  },
  methods: {
    updateUsers () {
      this.$emit('render-users')
    }
  },
};
</script>
