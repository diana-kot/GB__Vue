<template>
  <div class="wrapper">
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
      <button @click="onSave" :disabled="!category">Save</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "EditForm",
  props: {
    contextIdElem: Number,
  },
  data() {
    return {
      id: 0,
      value: "",
      date: "",
      category: "",
      isVisible: true,
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
    options() {
      return this.$store.getters.getCategoryList;
    },
  },
  methods: {
    ...mapMutations(["addPaymentListData"]),
    ...mapActions(["fetchCategory"]),

    onSave() {
     const { value, category } = this
        const data = {
            date: this.date || this.getCurrentDate,
            value,
            category,
            id: this.contextIdElem
        }

        if (data.value !== 0 && data.category !== '') {
          this.$store.commit('editDataInPaymentList', data)
        }
    },
  //   async created(){
  //     const item = this.$store.getters.getPaymentsItem(this.contextIdElem);
  //     this.contextIdElem = item.id
  //     this.value = item.value
  //     this.category = item.category
  //     this.date = item.date
  // }
  },
  async mounted() {
    if (!this.getCategoryList?.length) {
      await this.fetchCategory();
      this.category = this.categoryList[0];
      // this.$route.name === 'AddNewPayments'
      // if (this.$route.name === "AddNewPayments") {
      //   (this.value = Number(this.$route.query?.value) || 0),
      //     (this.category = this.$route?.params?.category || ""),
      //     (this.isVisible = true),
      //     this.onSave();
      //   this.$router.push({ name: "dashboard" });
      // }
    }
  },
};
</script>
<style lang="scss" scoped>
.add-cost-form {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr;
  width: 400px;
  & > input {
    max-width: 200px;
    margin-bottom: 5px;
  }
  & > select {
    max-width: 208px;
    margin-bottom: 5px;
  }
  & > button {
    max-width: 208px;
  }
}
</style>