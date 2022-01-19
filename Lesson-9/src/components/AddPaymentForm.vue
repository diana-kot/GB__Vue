<template>
  <v-card class="text-left pa-8">
    <v-container>
    <v-row>
     
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateFormatted"
              label="Date"
              hint="DD/MM/YY"
              persistent-hint
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
           
             @click="formatDate()"
          ></v-date-picker>
        </v-menu>
    </v-row>
  </v-container>
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
  
  data: vm => ( {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menu1: false,
      isDisabled: false,
      category: "",
      value: "",
      new_category: "",
     
  }),
  computed: {
    ...mapGetters(["getCategoryList"]),
    // getCurrentDate() {
    //   const today = new Date();
    //   const d = today.getDate();
    //   const m = today.getMonth() + 1;
    //   const y = today.getFullYear();
    //   return `${d}.${m}.${y}`;
    // },
    computedDateFormatted () {
        return this.formatDate(this.date)
        
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
          date: this.formatDate(this.strToDate(this.editedElem.date)), 
        };
        this.$store.dispatch("upgradeData", data);
        this.$emit("closeAddPayment");
        this.category = "";
        this.value = "";
        
      } else {
        const data = {
          id: 0,
          category: this.category,
          value: Number(this.value),
          date: this.formatDate(this.date) || this.formatDate(Date.now()),//this.getCurrentDate),
        };
        if (data.category !== '' && data.value !== ''){
          this.$emit("addNewPayment", data);
        }
        
      }
      this.data = ''
      this.category = "";
      this.value = "";
      this.date = "";
    },
    changeElem() {
      if (this.editedElem) {
        this.isDisabled = false;
        this.category = this.editedElem.category;
        this.value = this.editedElem.value;
        this.date = this.strToDate(this.editedElem.date);
       
        // console.log(typeof(this.parseDate(this.editedElem.date)))
      } else {
        this.isDisabled = false;
        this.category = "";
        this.value = "";
        this.date = "";
      }
    },
    formatDate (date) {
        if (!date) return null
        const options = {}
        return new Intl.DateTimeFormat('ru-Ru', options).format(new Date(date))
      },
    strToDate(datestr){
        if (!datestr) return null
        const [ day, month, year] = datestr.split('.')
        return new Date(year, month, day)
    },
    parseDate (date) {
        if (!date) return null

        const [ day, month, year] = date.split('.')
        return `${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`
        
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
    date () {
        this.dateFormatted = this.formatDate(this.date)
        
      },
  },
};
</script>

<style lang="scss" scoped>
</style>