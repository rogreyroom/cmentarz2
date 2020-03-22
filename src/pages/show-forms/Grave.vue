<template>
  <div class="q-pa-md">
    <q-page padding>
      <section>
        <header class="row q-pa-sm q-gutter-sm">
          <template v-if="flag === 'add'">
            <h5>
              Dodaj grób:
            </h5>
          </template>
          <template v-else>
            <h5>
              Edytuj grób:
              <strong class="q-ml-sm">{{ id }}</strong>
              ( {{ cmFullName }} )
            </h5>
          </template>
          <hr>
        </header>
        <grave-form
          :id="id"
          :grave="graveData"
          :flag="flag"
          :cemetery="cmFullName"
        />
      </section>
      <hr>
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
      <section>
        <div class="row q-pa-sm q-gutter-sm">
          <h5>
            Dane osoby zmarłej:
            <q-btn
              :to="{ name: 'user-add-edit', params: { id: id, flag: 'add' } }"
              flat
              icon="add"
              class="q-ml-md"
              text-color="light-blue-13"
            />
          </h5>
        </div>
        <div
          v-for="{_id, user} in usersData"
          :key="_id"
          class="row q-pa-sm q-gutter-sm"
        >
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
import Grave from '../../components/Forms/Grave'
import Taker from '../../components/Forms/Taker'
import SingleUser from '../../components/Views/SingleUser'

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
    flag: {
      type: String,
      default: 'add'
    },
  },
  data () {
    return {
      graveData: {},
      takerData: {},
      usersData: [],
      cmFullName: ''
    };
  },
  computed: {
    ...mapGetters({ grave: "cm/GET_GRAVE" }),
    ...mapGetters({ taker: "cm/GET_GRAVE_TAKER" }),
    ...mapGetters({ users: "cm/GET_GRAVE_USERS" }),
    ...mapGetters({ getCemetery: "cm/GET_PARCELA" })
  },
  mounted () {
    if (this.flag === 'edit') {
      const { parcela, parcela: { parcela: cmName } } = this.grave(this.id)[0]
      this.graveData = parcela
      const { thecm: { cmFullName } } = this.getCemetery(cmName)
      this.cmFullName = cmFullName

      const { taker } = this.taker(this.id)[0]
      this.takerData = taker

      this.usersData = this.users(this.id)
    }
  },
};
</script>

<style></style>
