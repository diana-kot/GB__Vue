<template>
  <div id="app">
    <div class="wrapper">
      <header>
        <div class="title">My personal costs</div>
        <div class="total" v-if="total">Total:{{ total }}</div>
      </header>
      <main>
      
      <add-payment-form/>
      <payments-display :items="currentElements" />    
      <pagination
          :cur="page"
          :n="n"
          :length="12"
          @paginate="changePage"
        />
        
      </main>
    </div>
  </div>
</template>

<script>
import AddPaymentForm from "./components/AddPaymentForm.vue";
import PaymentsDisplay from "./components/PaymentsDisplay.vue";
import Pagination from "./components/Pagination.vue";
import { mapMutations, mapGetters, mapActions} from "vuex";
// import simplebar from 'simplebar-vue';
// import 'simplebar/dist/simplebar.min.css';

export default {
  components: { PaymentsDisplay, AddPaymentForm, Pagination},
  name: "App",
  data() {
    return {
      show: true,
      page: 1,
      n: 3,
  
    };
  },
  computed: {
    ...mapGetters({paymentsList: 'getPaymentList'}),
    total(){
      return this.$store.getters.getPaymentListFullValuePrise
    },
    currentElements() {
      // const { n, page } = this;
      return this.paymentsList.slice(this.n * (this.page - 1), this.n * (this.page - 1) + this.n);
    },
    // currentElements() {
    //   return this.getPaymentsList.slice(this.n * (this.page - 1), this.n * (this.page - 1) + this.n);
    // },
  },
  methods: {
    ...mapMutations ({fetch: 'setPaymentsListData'}),
    ...mapActions(["addPaymentListData", 'fetchData']),
    changePage(p) {
      this.page = p;
      this.fetchData(p);
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
  created() {
    // this.$store.commit('setPaymentsListData', this.fetchData());
    // this.fetch(this.fetchData())
    // this.$store.dispatch('fetchData')
    this.fetchData(1);
  
  },
};
</script>

<style lang="scss" scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1 {
  font-size: 20px;
}
.tt {
  height: 160px;
}
</style>
