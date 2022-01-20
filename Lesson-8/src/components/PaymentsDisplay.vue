<template>
<div>
  <v-data-table
    :headers="headers"
    :items="items"
    :page.sync="page"
    hide-default-footer
    class="elevation-1"
    @page-count="pageCount = $event"
    
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-row>
              <v-col :cols="9">
                <v-card-title>
                  <span class="text-h5">Edit</span>
                </v-card-title>
              </v-col>
              <v-col :cols="3">
                <v-card-actions>
                  <v-btn
                    class="mt-2 ml-32"
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    <v-icon>mdi-close-thick</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
            <v-row>
              <v-card-text>
                <add-payment-form
                  :editedElem="editedItem"
                  @closeAddPayment="close"
                />
              </v-card-text>
            </v-row>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
  <div class="text-center pt-2">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
   
    </div>
  
    </div>
</template>

<script>

import AddPaymentForm from "./AddPaymentForm.vue";
export default {
  components: { AddPaymentForm },
 
  name: "PaymentsDisplay",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      headers: [
        {
          text: "#",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Date", value: "date" },
        { text: "Category", value: "category" },
        { text: "Value", value: "value" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      page: 1,
      pageCount: 0,
      itemsPerPage: 6,

      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {},
      defaultItem: {
        id: 0,
        date: "",
        category: "",
        value: 0,
      },
    };
  },
  created(){
    this.pageCount = this.items.length / this.itemsPerPage;
  },

  methods: {
    editItem(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = item.id;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.commit("deleteData", this.editedIndex);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>