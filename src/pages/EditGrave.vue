<template>
  <div class="q-pa-md">
    <edit-grave-form :id="id" />
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
