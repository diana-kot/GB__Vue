<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-h5 text-sm-h3 pb-2">My Personal Cost</div>
        <v-dialog v-model="dialog" width="500">
          <template #activator="{ on }">
            <v-btn color="teal" dark v-on="on">
              ADD NEW COST<v-icon>mdi-plus</v-icon></v-btn
            >
          </template>
          <add-payment-form @addNewPayment="addDataToPaymentList" />
        </v-dialog>
        <payments-display :items="paymentList" />
      </v-col>
      <v-col>
        <chart :items="paymentList" :fullPaymentValue="fullPayment" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaymentsDisplay from "../components/PaymentsDisplay.vue";
import { mapMutations, mapGetters } from "vuex";
import AddPaymentForm from "../components/AddPaymentForm.vue";
import Chart from "../components/Chart.vue";

export default {
  name: "Costs",
  components: {
    PaymentsDisplay,
    Chart,
    AddPaymentForm,
  },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapGetters({
      paymentList: "getPaymentList",
      category: "getCategoryList",
      fullPayment: "getFullPaymentValue",
    }),
    getFPV() {
      return this.$store.getters.getFitemsValue;
    },
  },
  methods: {
    ...mapMutations({
      myMutationName: "setPaymentListData",
      addData: "addPaymentListData",
    }),
    addDataToPaymentList(item) {
      item.id = this.paymentList[this.paymentList.length - 1].id + 1;
      this.addData(item);
      this.dialog = false;
    },
    renderPaymentList(num) {
      this.page = num;
    },
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth();
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
  },
  created() {
    this.$store.dispatch("fetchData");
  },
  mounted() {
    if (this.$route.params.section === "payment") {
      this.show = true;
      if (this.$route.params.category && this.$route.query.value) {
        this.addData({
          id: this.paymentList.length + 1,
          category: this.$route.params.category,
          value: Number(this.$route.query.value),
          date: this.getCurrentDate(),
        });
      }
    }
  },
};
</script>

<style lang="scss" module>
</style>