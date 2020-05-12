<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/cm.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">
      Przykro mi, coś poszło nie tak...<strong>(404)</strong>
    </p>
    <q-btn
      v-go-back.single=" '/' "
      size="14px"
      round
      dense
      color="indigo-9"
      icon="arrow_back"
      class="q-mr-sm"
    >
      <q-tooltip
        anchor="top middle"
        self="center middle"
        transition-show="scale"
        transition-hide="scale"
        content-class="bg-blue-4"
      >
        Wróć
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: "Error404"
};
</script>
