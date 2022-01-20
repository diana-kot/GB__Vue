<template>
<div class="wrappe">
    <button @click="editItem">Редактировать</button>
    <button @click="deleteItem">Удалить</button>
</div>
</template>

<script>

export default {
name: 'ContexMenu',
props: {
    index: Number
},
methods: {
  editItem () {
      this.$modal.show('EditForm', {header: 'Edit form', index: this.index})
    },
    deleteItem () {
      this.$store.commit('delItemFromPaymentList', this.index)
      this.$modal.hide()
    }
}
}
</script>

<style>

</style>