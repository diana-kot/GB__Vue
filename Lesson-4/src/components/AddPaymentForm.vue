<template>
  <div class="wrapper">
  <button class="btn btn-info" type="button" @click='isVisible = !isVisible'>ADD NEW COST+</button>
    <div class="categoryList">
      <select v-model="category">
        <option v-for="(category, idx) in categoryList"
          :key="idx"
          :value="category">{{ category }}</option>
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
      date: "",
      category: "",
      value: "",
      isVisible: false,
    };
  },
  computed: {
    ...mapGetters({categoryList: 'getCategoryList'}),
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
  },
  methods: {
    ...mapMutations(['addPaymentListData']),
    ...mapActions(['fetchCategory']),

    onClick() {
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: this.value,
      };
      // this.addPaymentListData(data)
      this.$store.dispatch('addPaymentListData', data)
      // this.$emit('addNewPayment', data)

    },
  },
  async mounted() {
    if (!this.getCategoryList?.length) {
      await this.fetchCategory();
  
     
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