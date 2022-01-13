<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-h5 text-sm-h3 mb-8">My personal costs</div>
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{on}">
            <v-btn @click="openModal" color="teal" dark v-on="on">
              ADD NEW COST <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
        
            <add-payment-form @addNewPayment="dialog=false"/>
          
        </v-dialog>

        <div class="total" v-if="total">Total:{{ total }}</div>
        <AddNewPayments />

        <payments-display :items="currentElements" />
        <!-- <pagination
          :cur="page"
          :n="n"
          :length="paymentsList.length"
          @paginate="changePage"
        /> -->
        <!-- <button @click="openModal">Add new cost +</button> -->
      </v-col>
      <v-col>
        chart
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaymentsDisplay from "../components/PaymentsDisplay.vue";
// import Pagination from "../components/Pagination.vue";
import AddNewPayments from "./AddNewPayments.vue";
import AddPaymentForm from '../components/AddPaymentForm.vue';
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  name: "dashboard",
  components: { PaymentsDisplay, AddNewPayments, AddPaymentForm },
  data() {
    return {
      addFormShow: false,
      dialog: false,
      settings: {
        content: "AddPaymentForm",
        header: "Add new cost",
      },
      page: 1,
      n: 5,
    };
  },
  computed: {
    ...mapGetters({ paymentsList: "getPaymentList" }),
    total() {
      return this.$store.getters.getPaymentListFullValuePrise;
    },
    currentElements() {
      // const { n, page } = this;
      return this.paymentsList.slice(
        this.n * (this.page - 1),
        this.n * (this.page - 1) + this.n
      );
    },
  },
  methods: {
    ...mapMutations({ fetch: "setPaymentsListData" }),
    ...mapActions(["addPaymentListData", "fetchData"]),
    changePage(p) {
      this.page = p;
      this.fetchData(p);
    },
    openModal() {
      this.$modal.show("AddPaymentForm", {
        content: "AddPaymentForm",
        header: "Add new cost",
      });
    },
  },
  async created() {
    // this.$store.commit('setPaymentsListData', this.fetchData());
    // this.fetch(this.fetchData())
    // this.$store.dispatch('fetchData')
    await this.fetchData(1);
    if (this.$route.params?.page) {
      this.page = Number(this.$route.params.page);
    }
  },
};
</script>

<style></style>
