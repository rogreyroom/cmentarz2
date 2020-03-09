<template>
  <div class="row q-pa-sm q-gutter-sm">

    <div class="row q-ma-md">
      <div class="col">
        <div class="row">
          <p><strong>Imię:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="graveData.okres"
            outlined
            label="5"
            name="okres"
            class="full-width"
          />
        </div>
      </div>

      <div class="col">
        <div class="row">
          <p><strong>Nazwisko:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="graveData.okres"
            outlined
            label="5"
            name="okres"
            class="full-width"
          />
        </div>
      </div>
    </div>
    <div class="row q-ma-md">
      <div class="col">
        <div class="row">
          <p><strong>Data urodzenia:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            name="dtOplaty"
            outlined
            v-model="graveData.dtOplaty"
            mask="date"
            :rules="['date']"
          >
            <template v-slot:append>
              <q-icon
                name="event"
                class="cursor-pointer"
              >
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="graveData.dtOplaty"
                    @input="() => $refs.qDateProxy.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>

      <div class="col">
        <div class="row">
          <p><strong>Miejsce urodzenia:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="graveData.okres"
            outlined
            label="5"
            name="okres"
            class="full-width"
          />
        </div>
      </div>
    </div>
    <div class="row q-ma-md">
      <div class="col">
        <div class="row">
          <p><strong>Nazwisko rodowe:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="graveData.okres"
            outlined
            label="5"
            name="okres"
            class="full-width"
          />
        </div>
      </div>

      <div class="col">
        <div class="row">
          <p><strong>Stan cywilny:</strong></p>
        </div>
        <div class="row full-width">
          <q-select
            v-model="graveData.rodzaj"
            outlined
            :options="graveOptions"
            label="Wybierz"
            name="rodzaj"
            class="full-width"
          />
        </div>
      </div>
    </div>

    <hr>

    <div class="row q-ma-md">
      <div class="col">
        <div class="row">
          <p><strong>Data zgonu:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            name="dtOplaty"
            outlined
            v-model="graveData.dtOplaty"
            mask="date"
            :rules="['date']"
          >
            <template v-slot:append>
              <q-icon
                name="event"
                class="cursor-pointer"
              >
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="graveData.dtOplaty"
                    @input="() => $refs.qDateProxy.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <div class="col">
        <div class="row">
          <p><strong>Miejsce zgonu:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="graveData.okres"
            outlined
            label="5"
            name="okres"
            class="full-width"
          />
        </div>
      </div>
      <div class="col">
        <div class="row">
          <p><strong>Data pochówku:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            name="dtOplaty"
            outlined
            v-model="graveData.dtOplaty"
            mask="date"
            :rules="['date']"
          >
            <template v-slot:append>
              <q-icon
                name="event"
                class="cursor-pointer"
              >
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="graveData.dtOplaty"
                    @input="() => $refs.qDateProxy.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <div class="col">
        <div class="row">
          <p><strong>Miejsce pochówku:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="graveData.okres"
            outlined
            label="5"
            name="okres"
            class="full-width"
          />
        </div>
      </div>
    </div>

    <hr>

    <div class="row q-ma-md">
      <div class="col">
        <div class="row">
          <p><strong>Imię matki:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="graveData.okres"
            outlined
            label="5"
            name="okres"
            class="full-width"
          />
        </div>
      </div>
      <div class="col">
        <div class="row">
          <p><strong>Nazwisko Matki:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="graveData.okres"
            outlined
            label="5"
            name="okres"
            class="full-width"
          />
        </div>
      </div>
      <div class="col">
        <div class="row">
          <p><strong>Imię ojca:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="graveData.okres"
            outlined
            label="5"
            name="okres"
            class="full-width"
          />
        </div>
      </div>
      <div class="col">
        <div class="row">
          <p><strong>Nazwisko ojca:</strong></p>
        </div>
        <div class="row full-width">
          <q-input
            v-model="graveData.okres"
            outlined
            label="5"
            name="okres"
            class="full-width"
          />
        </div>
      </div>
    </div>

    <div class="row q-ma-md">
      Przycisk: Zmień
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import GraveUser from '../components/GraveUser'

export default {
  components: {
    // 'grave-user': GraveUser
  },
  data () {
    return {
      id: this.$route.params.id,
      graveData: {},
      takerData: {},
      usersData: [],
      graveOptions: [
        'Zwykły', 'Murowany', 'Rodzinny', 'Katakumba', 'Głębinowy'
      ],
      graveStatus: [
        'Nie opłacony', 'Opłacony', 'Puste'
      ],

    };
  },
  computed: {
    ...mapGetters({ grave: "cm/GET_GRAVE" }),
    ...mapGetters({ taker: "cm/GET_GRAVE_TAKER" }),
    ...mapGetters({ users: "cm/GET_GRAVE_USERS" }),
  },
  mounted () {
    const { parcela } = this.grave(this.id)[0]
    this.graveData = parcela

    const { taker } = this.taker(this.id)[0]
    this.takerData = taker

    this.usersData = this.users(this.id)
  },
  methods: {
  },
};
</script>

<style>
hr {
  display: block;
  border: 0;
  height: 0;
  width: 96%;
  margin: 1rem auto;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
