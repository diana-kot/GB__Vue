<template>
  <v-card class="text-left pa-8">
    <v-text-field v-model="date" label="Date"> </v-text-field>
    <v-select
          :items="categoryList"
          label="Category"
          v-model="category"
        ></v-select>
    <v-text-field v-model.number="value" label="Value"> </v-text-field>
    <v-btn @click="onSave">Save</v-btn>
  </v-card>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "AddPaymentForm",
  props: {
    contextIdElem: Number,
   
  },
  data() {
    return {
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
      if (this.contextIdElem) {
        const editdata = {
          id: this.contextIdElem,
          category: this.category,
          value: Number(this.value),
        };
        this.$store.commit("editDataInPaymentList", editdata);
        this.$modal.close();
       
      } else {
        // const { value, category} = this
        const lastItemId = this.$store.getters.getPaymentList.length;
        const data = {
          date: this.date || this.getCurrentDate,
          category: this.category,
          value: Number(this.value),
          id: lastItemId + 1
          
         
        };       
        this.$emit("addNewPayment", data)
        // if (this.value !== 0 && this.category !== "") {
        //   this.$emit("addNewPayment", data);
        //   this.addPaymentListData(data);
        // }
      }
    },
  },
  async mounted() {
    if (!this.getCategoryList?.length) {
      await this.fetchCategory();
      this.category = this.categoryList[0];
      // this.$route.name === 'AddNewPayments'
      if (this.$route.name === "AddNewPayments") {
        (this.value = Number(this.$route.query?.value) || 0),
          (this.category = this.$route?.params?.category || ""),
          (this.isVisible = true),
          this.onSave();
        this.$router.push({ name: "dashboard" });
      }
    }
  },
};
</script>
<style lang="scss" scoped>
// .add-cost-form {
//   margin-top: 10px;
//   display: grid;
//   grid-template-columns: 1fr;
//   width: 400px;
//   & > input {
//     max-width: 200px;
//     margin-bottom: 5px;
//   }
//   & > select {
//     max-width: 208px;
//     margin-bottom: 5px;
//   }
//   & > button {
//     max-width: 208px;
//   }
// }
</style>