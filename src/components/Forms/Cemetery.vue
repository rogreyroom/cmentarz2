<template>
  <div class="row q-pa-sm q-gutter-sm">

    <div class="row">
      <p><strong>Wybierz położenie kluczowych elementów cmentarza</strong></p>

      <div class="col-3">
        <div class="row">
          1-szy rząd <input
            type="radio"
            name="rzad"
            value="rzadTop"
          >
        </div>
        <div class="row opis">???????????</div>
        <div class="row">
          1-szy rząd <input
            type="radio"
            name="rzad"
            value="rzadBottom"
          >
        </div>
      </div>

      <div class="col-5 rama">

        <div class="row">

          <div>
            <div class="col-6 t-al-l">
              1-szy grób <input
                type="radio"
                name="grob"
                value="grobLeftTop"
              >
            </div>
            <div class="col-6 t-al-r">
              1-szy grób <input
                type="radio"
                name="grob"
                value="grobRightTop"
              >
            </div>
          </div>

        </div>

        <div class="row opis"><strong>CMENTARZ</strong></div>

        <div class="row">

          <div>
            <div class="col-6 t-al-l">
              1-szy grób <input
                type="radio"
                name="grob"
                value="grobLeftBottom"
              >
            </div>
            <div class="col-6 t-al-r">
              1-szy grób <input
                type="radio"
                name="grob"
                value="grobRightBottom"
              >
            </div>
          </div>

        </div>

      </div>

    </div>

    <div class="row box">

      <div class="col-3 t-al-r">
        Wejście:
      </div>

      <div class="col-5">
        <div class="col-6 t-al-l">
          po lewej <input
            type="radio"
            name="wejscie"
            value="wejscieLeft"
          >
        </div>
        <div class="col-6 t-al-r">
          po prawej <input
            type="radio"
            name="wejscie"
            value="wejscieRight"
          >
        </div>
      </div>

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
    flag: {
      type: String,
      default: 'add'
    },
    cemetery: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
