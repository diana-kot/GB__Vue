<template>
  <div class="wrapper">
      <div class="header">{{ params.header }} {{ params.item.id }}</div>
      <div class="content">
          <button @click="onEdit">Редактировать</button><br />
          <button :disabled="isMenu" @click="onDelete">Удалить</button>
          <button @click="onClose">Close</button>
      </div>
  </div>
</template>

<script>
export default {
    name: 'ContextMenu',
    data(){
        return{
            isDelite: false
        }
    },

    props:{
        params: {
            type: Object,
            required: true
        }
    },

    methods:{
        onEdit(){
            this.$menu.hide()
            this.$router.push({name:'AddPaymentForm', query: {id: this.params.item.id}})
        },
        onDelete(){
            this.isDelite = true
            this.$store.dispatch('delCostsFromPaymentList', this.params.item)
            .then()=>{
                this.$menu.hide()
            }

        },
        onClose(){
            this.$menu.hide();
        }
    }

}
</script>

<style>

</style>