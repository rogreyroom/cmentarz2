<template>
  <div class="row q-pa-sm q-gutter-sm">
    <section class="row full-width">
      <div class="row full-width q-ma-md">
        <div class="row full-width">
          <p><strong>Nazwa cmentarza/parceli:</strong></p>
        </div>
        <div class="row">
          <q-input
            v-model="cmFullName"
            type="text"
            outlined
            label="Pełna nazwa cmentarza"
            size="50%"
            :rules="[val => !!val || 'Pole jest wymagane']"
          />
        </div>
      </div>
    </section>
    <section class="row full-width justify-center q-pa-md">
      <div class="row full-width justify-center q-pa-md">
        <div class="column col-4 justify-between q-pa-md cemetery-schema-height ">
          <div class="row full-width justify-end">
            <span>
              <q-radio
                v-model="rzad"
                val="rzadTop"
                label="1-szy rząd"
                left-label
                color="light-blue-13"
                :rules="[val => !!val || 'Pole jest wymagane']"
              />
            </span>
          </div>
          <div class="row full-width justify-end">
            <span>
              <q-radio
                v-model="rzad"
                val="rzadBottom"
                label="1-szy rząd"
                left-label
                color="light-blue-13"
                :rules="[val => !!val || 'Pole jest wymagane']"
              />
            </span>
          </div>
        </div>
        <div class="column col-6 relative-position cemetery-schema-border cemetery-schema-height">
          <div
            v-if="rzad === 'rzadTop'"
            class="row full-width justify-between items-center q-pa-md absolute-top"
          >
            <span>
              <q-radio
                v-model="grob"
                val="grobLeftTop"
                label="1-szy grób"
                color="light-blue-13"
                :rules="[val => !!val || 'Pole jest wymagane']"
              />
            </span>
            <span>
              <q-radio
                v-model="grob"
                val="grobRightTop"
                label="1-szy grób"
                left-label
                color="light-blue-13"
                :rules="[val => !!val || 'Pole jest wymagane']"
              />
            </span>
          </div>
          <div class="absolute-center">
            <strong>CMENTARZ</strong>
          </div>
          <div
            v-if="rzad === 'rzadBottom'"
            class="row full-width justify-between items-center q-pa-md absolute-bottom"
          >
            <span>
              <q-radio
                v-model="grob"
                val="grobLeftBottom"
                label="1-szy grób"
                color="light-blue-13"
                :rules="[val => !!val || 'Pole jest wymagane']"
              />
            </span>
            <span>
              <q-radio
                v-model="grob"
                val="grobRightBottom"
                label="1-szy grób"
                left-label
                color="light-blue-13"
                :rules="[val => !!val || 'Pole jest wymagane']"
              />
            </span>
          </div>
        </div>
      </div>

      <div class="row full-width justify-center q-pa-md">
        <div class="column col-4 justify-center q-pa-md ">
          <div class="row full-width justify-end ">
            <strong>Wejście</strong>
          </div>
        </div>

        <div class="column col-6 relative-position q-pa-md ">
          <div class="row full-width justify-between items-center">
            <span>
              <q-radio
                v-model="wejscie"
                val="wejscieLeft"
                label="po lewej"
                color="light-blue-13"
                :rules="[val => !!val || 'Pole jest wymagane']"
              />
            </span>
            <span>
              <q-radio
                v-model="wejscie"
                val="wejscieRight"
                label="po prawej"
                left-label
                color="light-blue-13"
                :rules="[val => !!val || 'Pole jest wymagane']"
              />
            </span>
          </div>
        </div>
      </div>
    </section>

    <template v-if="flag === 'add'">
      <div class="row full-width">
        <q-btn
          unelevated
          outline
          label="Dodaj"
          size="md"
          class="q-ml-md"
          text-color="light-blue-13"
          @click="addCemetery()"
        />
      </div>
    </template>
    <template v-else>
      <div class="row full-width">
        <q-btn
          unelevated
          outline
          label="Zmień"
          size="md"
          class="q-ml-md"
          text-color="light-blue-13"
          @click="updateCemetery()"
        />
      </div>
    </template>
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
  data () {
    return {
      cName: '',
      cmFullName: '',
      rzad: '',
      grob: '',
      wejscie: ''
    }
  },
  created () {
    if (this.flag === 'edit') {
      const { cName, cmFullName, rzad, grob, wejscie } = this.cemetery
      this.cmFullName = cmFullName
      this.cName = cName
      this.rzad = rzad
      this.grob = grob
      this.wejscie = wejscie
    }
  },
  methods: {
    addCemetery () { },
    updateCemetery () { }
  }
}
</script>

<style lang="scss" scoped>
.cemetery-schema-border {
  border: 1px solid $grey-5;
  border-radius: 4px;
}

.cemetery-schema-height {
  min-height: 200px;
  max-height: 200px;
}
</style>
