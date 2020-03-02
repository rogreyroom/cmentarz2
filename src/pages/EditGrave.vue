<template>
  <div class="q-pa-md">
    edit grave - {{ id }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: this.$route.params.id,
    };
  },
};
</script>

<style></style>
