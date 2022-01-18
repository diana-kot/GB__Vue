<template>
  <div class="wrapper">
  <button class="btn btn-info" type="button" @click='isVisible = !isVisible'>ADD NEW COST+</button>
    <div class="add_cost" v-show="isVisible">
      <input placeholder="date" v-model="date" />
      <input placeholder="category" v-model="category" />
      <input placeholder="value" type="number" v-model.number="value" />
      <button @click="onClick">Save</button>
    </div>
  </div>
</template>

<script>
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
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth() + 1;
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
  },
  methods: {
    onClick() {
      const data = {
        date: this.date || this.getCurrentDate,
        category: this.category,
        value: this.value,
      };
      this.$emit('addNewPayment', data)
    },
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