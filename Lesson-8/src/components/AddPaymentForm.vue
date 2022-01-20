<template>
  <v-card class="text-left pa-8">
    <v-text-field label="Payment date" v-model="date"></v-text-field>
    <v-text-field label="Payment amount" v-model="value"></v-text-field>
    <v-select
      :items="getCategoryList"
      label="Category"
      v-model="category"
    ></v-select>
    <v-btn class="save_btn" @click="onSave()"
      >SAVE <v-icon>mdi-plus</v-icon></v-btn
    >
  </v-card>
</template>

<script>
import { mapMutations } from "vuex";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AddPaymentForm",
  props: {
    editedElem: Object,
  },
  data() {
    return {
      isDisabled: false,
      category: "",
      value: "",
      date: "",
      new_category: "",
    };
  },
  computed: {
    ...mapGetters(["getCategoryList"]),
    getCurrentDate() {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth();
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
  },
  methods: {
    ...mapMutations({
      addCategory: "addNewCategory",
    }),
    ...mapActions(["fetchCategoryList"]),
    addToCategoryList() {
      this.addCategory(this.new_category);
    },
    onSave() {
      if (this.editedElem) {
        const data = {
          id: this.editedElem.id,
          category: this.category,
          value: Number(this.value),
        };
        this.$store.dispatch("upgradeData", data);
        this.$emit("closeAddPayment");
        this.category = "";
        this.value = "";
        this.date = "";
      } else {
        const data = {
          id: 0,
          category: this.category,
          value: Number(this.value),
          date: this.date || this.getCurrentDate,
        };
        this.$emit("addNewPayment", data);
      }
    },
    changeElem() {
      if (this.editedElem) {
        this.isDisabled = true;
        this.category = this.editedElem.category;
        this.value = this.editedElem.value;
      } else {
        this.isDisabled = false;
        this.category = "";
        this.value = "";
        this.date = "";
      }
    },
  },
  mounted() {
    if (!this.getCategoryList?.length) {
      this.fetchCategoryList();
    }
    this.changeElem();
    if (this.$route.params.category) {
      this.category = this.$route.params.category;
    }
    if (this.$route.query.value) {
      this.value = this.$route.query.value;
    }
  },
  watch: {
    editedElem() {
      this.changeElem();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>