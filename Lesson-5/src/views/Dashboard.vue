<template>
  <main>
    <add-payment-form />
    <payments-display :items="currentElements" />
    <button @click="addItem('/add/payment/Food?value=200')">Add Item</button>
    <pagination
      :cur="page"
      :n="n"
      :length="12"
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
      n: 3,
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
    addItem(link){
      this.$router.push(link)
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