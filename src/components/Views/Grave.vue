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
        <q-img
          src="https://placeimg.com/500/300/nature"
          style="max-width: 400px; height: 200px;"
        />
        <!-- {{ graveData.ext }} -->
      </div>
      <div class="col q-ml-lg justify-start">
        <div class="row">
          <p><strong>Parcela:</strong> {{ cemetery }}</p>
        </div>
        <div class="row">
          <p><strong>Rząd:</strong> {{ grave.rzad }}</p>
        </div>
        <div class="row">
          <p><strong>Numer grobu:</strong> {{ grave.grob }}</p>
        </div>
        <div class="row">
          <p><strong>Rodzaj grobu:</strong> {{ grave.rodzaj }}</p>
        </div>
        <div class="row">
          <p><strong>Status grobu:</strong> {{ grave.status }}</p>
        </div>
      </div>
    </div>
    <div class="row q-pa-sm q-gutter-sm">
      <div class="col">
        <p><strong>Okres opłaty:</strong> {{ grave.okres }}</p>
      </div>
      <div class="col">
        <p><strong>Data opłaty:</strong> {{ grave.dtOplaty }}</p>
      </div>
    </div>
    <div class="row q-pa-sm q-gutter-sm">
      <p><strong>Uwagi:</strong> {{ grave.uwagi }}</p>
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
    }

  },
  computed: {
  },
  mounted () {
  },
  methods: {
  },
};
</script>
