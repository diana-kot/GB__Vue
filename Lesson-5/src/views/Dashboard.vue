<template>
  <main>
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
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  name: "dashboard",
  components: { PaymentsDisplay, AddPaymentForm, Pagination },
  data() {
    return {
      show: true,
      page: 1,
      n: 10,
    };
  },
  computed: {
    ...mapGetters({ paymentsList: "getPaymentList" }),
    total() {
      return this.$store.getters.getPaymentListFullValuePrise;
    },
    currentElements() {
      const { n, page } = this;
      return this.paymentsList.slice(n * (page - 1), n * (page - 1) + n);
    },
  },
  methods: {
    ...mapMutations({ fetch: "setPaymentsListData" }),
    ...mapActions(["addPaymentListData", "fetchData"]),
    changePage(p) {
      this.page = p;
    },
    // fetchData() {
    //   return [
    //     {
    //       date: "28.03.2020",
    //       category: "Food",
    //       value: 169,
    //     },
    //     {
    //       date: "24.03.2020",
    //       category: "Transport",
    //       value: 360,
    //     },
    //     {
    //       date: "24.03.2020",
    //       category: "Food",
    //       value: 532,
    //     },
    //     {
    //       date: "24.03.2020",
    //       category: "Internet",
    //       value: 532,
    //     },
    //     {
    //       date: "24.03.2020",
    //       category: "Sport",
    //       value: 532,
    //     },
    //     {
    //       date: "24.03.2020",
    //       category: "Food",
    //       value: 532,
    //     },
    //   ];
    // },
    // addToPaymentList(props) {
    //   console.log('run')
    //   // this.paymentsList.push(data)
    //   this.paymentsList = [...this.paymentsList, props];
    // },
  },
  async created() {
    // this.$store.commit('setPaymentsListData', this.fetchData());
    // this.fetch(this.fetchData())
    // this.$store.dispatch('fetchData')
    await this.fetchData();
    if(this.$route.params?.page) {
      this.page = Number(this.$route.params.page)
    }
  },
};
</script>

<style>
</style>