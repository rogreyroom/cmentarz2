<template>
  <div class="q-pa-md">
    <q-page padding>
      <div class="row q-pa-sm q-gutter-sm">
        <h5>
          Edytuj grób:
          <strong class="q-ml-sm">{{ id }}</strong>
          (Cmantarz dolny)
        </h5>
      </div>
      <hr>
      <edit-grave-form :id="id" />
      <hr>
      <!-- edit-grave-taker-form -->
      <div class="row q-pa-sm q-gutter-sm">
        <h5>
          Dane opiekuna grobu:
        </h5>
      </div>
      <edit-grave-taker-form :id="id" />
      <hr>
      <!-- list-grave-users -->
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
        <grave-user
          :id="_id"
          :user="user"
        />
      </div>
    </q-page>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EditGrave from '../components/Forms/EditGrave'
import EditGraveTaker from '../components/Forms/EditGraveTaker'
import GraveUser from '../components/GraveUser'

export default {
  components: {
    'edit-grave-form': EditGrave,
    'edit-grave-taker-form': EditGraveTaker,
    'grave-user': GraveUser
  },
  data () {
    return {
      id: this.$route.params.id,
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
