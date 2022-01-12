<template>
  <div class="wrapper">
    <button class="btn btn-info" type="button" @click="isVisible = !isVisible">
      ADD NEW COST+
    </button>
    <div class="categoryList">
      <select v-model="category">
        <option
          v-for="(category, idx) in categoryList"
          :key="idx"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>
    <div class="add_cost" v-show="isVisible">
      <input placeholder="date" v-model="date" />
      <input placeholder="category" v-model="category" />
      <input placeholder="value" type="number" v-model.number="value" />
      <button @click="onClick">Save</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "AddPaymentForm",
  data() {
    return {
      id: 0,
      value: "",
      date: "",
      category: "",
      isVisible: false,
    };
  },
  computed: {
    ...mapGetters({ categoryList: "getCategoryList" }),
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
  },
  methods: {
    ...mapMutations(["addPaymentListData"]),
    ...mapActions(["fetchCategory"]),

    onClick() {
      // const { value, category} = this
      const lastItemId = this.$store.getters.getPaymentList.length;
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: this.value,
        id: lastItemId + 1
      };

    if (this.value !== 0 && this.category !== '') {
      this.$emit('addNewPayment', data)
      this.$store.dispatch("addPaymentListData", data)

      if (this.$router.currentRoute.path.includes('/add/payment/')) {
        this.addPaymentListData(data);
        this.$router.push('/dashboard');
      }
    }
    },
  },
  async mounted() {
    if (!this.getCategoryList?.length) {
      await this.fetchCategory();

      if (this.$route.name === 'AddPaymentFromUrl') {
        this.value = Number(this.$route.query?.value) || 0,
        this.category = this.$route?.params?.category || '',
        this.isVisible = true
    }
    }
  },
};
</script>
<style>
.add_cost {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr;
  width: 400px;
}
input {
  max-width: 200px;
  margin-bottom: 5px;
}
button {
  max-width: 208px;
}
</style>