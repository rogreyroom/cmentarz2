<template>
  <div class="q-pa-md">
    <q-page padding>
      <section>
        <header class="row q-pa-sm q-gutter-sm">
          <h5>
            Edytuj grób:
            <strong class="q-ml-sm">{{ id }}</strong>
            (Cmantarz dolny)
          </h5>
          <hr>
        </header>
        <grave-form
          :id="id"
          :grave="graveData"
          flag="edit"
        />
      </section>
      <hr>
      <!-- edit-grave-taker-form -->
      <section>
        <div class="row q-pa-sm q-gutter-sm">
          <h5>
            Dane opiekuna grobu:
          </h5>
        </div>
        <taker-form
          :id="id"
          :taker="takerData"
          flag="edit"
        />
      </section>
      <hr>
      <!-- list-grave-users -->
      <section>
        <div class="row q-pa-sm q-gutter-sm">
          <h5>
            Dane osoby zmarłej:
          </h5>
          <q-btn
            :to="{ name: 'grave-edit', params: {id: id} }"
            flat
            icon="add"
            class="q-ml-md"
            text-color="light-blue-13"
          />
        </div>
        <div
          v-for="{_id, user} in usersData"
          :key="_id"
          class="row q-pa-sm q-gutter-sm"
        >
          <!-- {{user}} -->
          <single-user
            :id="_id"
            :user="user"
          />
        </div>
      </section>
    </q-page>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Grave from '../components/Forms/Grave'
import Taker from '../components/Forms/Taker'
import SingleUser from '../components/SingleUser'

export default {
  components: {
    'grave-form': Grave,
    'taker-form': Taker,
    'single-user': SingleUser
  },
  props: {
    id: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      // id: this.$route.params.id,
      graveData: {},
      takerData: {},
      usersData: []
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
};
</script>

<style></style>
