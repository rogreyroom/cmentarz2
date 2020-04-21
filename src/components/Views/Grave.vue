<template>
  <section>
    <div class="row q-pa-sm q-gutter-sm">
      <h5>
        Dane grobu:
        <strong class="q-ml-sm">{{ id }}</strong>
        <q-btn
          :to="{ name: 'grave-add-edit', params: { id: id, flag: 'edit', cemetery: cemetery }}"
          flat
          icon="edit"
          class="q-ml-md"
          text-color="light-blue-13"
        />
        <q-btn
          :to="{ name: 'cemetery-map', params: { id: id, flag:'show-grave', name: grave.parcela, grave: { cm: grave.parcela, r: grave.rzad, g: grave.grob } }}"
          flat
          icon="map"
          class="q-ml-md"
          text-color="light-blue-13"
        />
      </h5>
    </div>
    <hr>
    <div class="row q-pa-sm q-gutter-sm">
      <div class="col">
        <div class="row q-ma-md">
          <q-img
            :src="getUrl"
            style="height: 300px;"
            class="full-width"
          />
        </div>
        <div class="row q-ma-md">
          <p><strong>Uwagi:</strong> {{ grave.uwagi }}</p>
        </div>
      </div>

      <div class="col">
        <div class="row q-ma-md">
          <p><strong>Parcela:</strong> {{ cemetery }}</p>
        </div>
        <div class="row q-ma-md">
          <p><strong>Rząd:</strong> {{ grave.rzad }}</p>
        </div>
        <div class="row q-ma-md">
          <p><strong>Numer grobu:</strong> {{ grave.grob }}</p>
        </div>
        <div class="row q-ma-md">
          <p><strong>Rodzaj grobu:</strong> {{ grave.rodzaj }}</p>
        </div>
        <div class="row q-ma-md">
          <p><strong>Status grobu:</strong> {{ grave.status }}</p>
        </div>
        <div class="row q-ma-md">
          <p><strong>Okres opłaty:</strong> {{ grave.okres }}</p>
        </div>
        <div class="row q-ma-md">
          <p><strong>Data opłaty:</strong> {{ grave.dtOplaty }}</p>
        </div>
      </div>
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
    grave: {
      type: Object,
      default: function () {
        return {}
      }
    },
    cemetery: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      url: 'http://localhost:8000/images/',
    }

  },
  computed: {
    getUrl () {
      return this.grave.imgFileName
        ? `${this.url}${this.grave.imgFileName}?${+ Date.now()}`
        : this.grave.ext
          ? `${this.url}${this.createImageName()}.${this.grave.ext}?${+ Date.now()}`
          : ''
    }
  },
  methods: {
    createImageName () {
      return `${this.id.replace(/\|/gi, '-')}`;
    },
  },
};
</script>
