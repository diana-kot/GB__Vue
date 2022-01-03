<template>
  <main>
    <div class="total" v-if="total">Total:{{ total }}</div>
    <AddNewPayments />
    <add-payment-form />
    <payments-display :items="currentElements" />
    
    <pagination
      :cur="page"
      :n="n"
      :length="paymentsList.length"
      @paginate="changePage"
    />
  </main>
</template>

<script>
import AddPaymentForm from "../components/AddPaymentForm.vue";
import PaymentsDisplay from "../components/PaymentsDisplay.vue";
import Pagination from "../components/Pagination.vue";
import AddNewPayments from "./AddNewPayments.vue"
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  name: "dashboard",
  components: { PaymentsDisplay, AddPaymentForm, Pagination, AddNewPayments },
  data() {
    return {
      show: true,
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
      return this.paymentsList.slice(this.n * (this.page - 1), this.n * (this.page - 1) + this.n);
    },
  },
  methods: {
    ...mapMutations({ fetch: "setPaymentsListData" }),
    ...mapActions(["addPaymentListData", "fetchData"]),
    changePage(p) {
      this.page = p;
      this.fetchData(p);
    },
  },
  async created() {
    // this.$store.commit('setPaymentsListData', this.fetchData());
    // this.fetch(this.fetchData())
    // this.$store.dispatch('fetchData')
    await this.fetchData(1);
    if(this.$route.params?.page) {
      this.page = Number(this.$route.params.page)
    }
  },
};
</script>

<style>
</style>