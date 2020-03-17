<template>
  <section>
    <div class="row q-pa-sm q-gutter-sm">
      <h5>
        Cmentarz nazwa
      </h5>

      <!-- Tu będzie mapa cmentarza, pwinna też przyjmować id grobu i go zaznaczać  -->
    </div>
  </section>
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
