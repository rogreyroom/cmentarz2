<template>
  <div class="q-pa-md">
    add cemetery
    (show-form)
    <hr>
    <div>
      id: {{ id }}
    </div>
    <hr>
    <div>
      dane:
      {{ cemetery }}
    </div>
  </div>
</template>

<script>
export default {
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
    }
  }
};
</script>

<style></style>
