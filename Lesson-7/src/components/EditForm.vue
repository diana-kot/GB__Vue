<template>
  <div>
    <input type="text" v-model="date" placeholder="date" />
      <select v-model="category" v-if="options">
        <option v-for="option in options" :value="option" :key="option">
          {{ option }}
        </option>
      </select>
      <input type="number" v-model.number="value" placeholder="value" />
      <button @click="onSave" :disabled="!category">Save</button>
  </div>
</template>

<script>
export default {
  name: "EditForm",
  data() {
    return {
      id: 0,
      value: "",
      category: "",
      date: "",
    };
  },
  computed: {
      getCurrentDate () {
      const today = new Date();
      const d = today.getDate()
      const m = today.getMonth() + 1
      const y = today.getFullYear()
      return `${d}.${m}.${y}`
    },
    options(){
      return this.$store.getters.getCategoryList
    }
  },
  props:[
    'index'
  ],
  methods: {
    onSave() {
        const { value, category } = this
        const data = {
            date: this.date || this.getCurrentDate,
            value,
            category,
            id: this.index
        }

        if (data.value !== 0 && data.category !== '') {
          //const index = Number(this.index) -1
          // this.$store.commit('editDataInPaymentList', {data, index})
          this.$store.commit('editDataInPaymentList', data)
        }
    }
  },
  async created(){
    const item = this.$store.getters.getPaymentsItem(this.index);
    this.index = item.index
    this.value = item.value
    this.category = item.category
    this.date = item.date
  }
};
</script>

<style></style>
