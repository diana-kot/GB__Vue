
<template>
  <v-container>
    <v-row>
      <v-col :cols="1">
        #
      </v-col>
      <v-col>
        Date
      </v-col>
      <v-col>
        Category
      </v-col>
      <v-col :cols="2">
        Value
      </v-col>
      </v-row>
      <v-row v-for="(item, idx) in items" :key="idx">
        <v-col :cols="1">{{item.id}}</v-col>
        <v-col>{{item.date}}</v-col>
        <v-col>{{item.category}}</v-col>
        <v-col :cols="2">{{item.value}}</v-col>
        <!-- <v-col><span @click="onClickContextItem($event, item)">...</span></v-col> -->
    </v-row>
  </v-container>
</template>


<script>
export default {
  name: "PaymentsDisplay",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    contextIdElem: Number,
  },
  methods: {
    // this.$modal.show('EditForm', {header: 'Edit form', index: this.index})
    editItem() {
      // console.log(item);
      // this.$router.push('/editForm/'+ item.id)
      this.$modal.show("EditForm", {
        header: "Edit Payment",
        index: this.contextIdElem,
      });
    },
    onClickContextItem(event, item) {
      const items = [
        {
          text: "Edit",
          action: () => {
            this.editItem(item);
          },
        },
        {
          text: "Delete",
          action: () => {
            // console.log("delete", item);
            this.$store.commit("delItemFromPaymentList", item.id);
          },
        },
      ];
      this.$context.show({ event, items });
    },
  },
};
</script>

<style lang="scss">

</style>
