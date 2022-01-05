<template>
<div class="wrapper">
    {{itemId}}
    <button @click="editItem">Редактировать</button>
    <button @click="deleteItem">Удалить</button>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
name: 'ContexMenu',
props: {
    itemId: Number
},
methods: {
     editItem () {
      this.$modal.hide()
      const title = 'Edit'
      const settings = {
        modalWindowContent: 'AddPaymentForm',
        itemId: this.itemId,
        edit: true,
        categoryList: this.getCategoryList
      }
      this.$modal.show(title, settings)
    },
    deleteItem () {
      this.$store.commit('delItemFromPaymentList', this.itemId)
      this.$modal.hide()
    }
}
}
</script>

<style>

</style>