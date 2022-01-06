<template>
<div class="wrapper">
    <div class="title">
        <div><b>#</b></div>
        <div><b>Date</b></div>
        <div><b>Category</b></div>
        <div><b>Value</b></div>
    </div>
    <div class="item" v-for="item, idx in items" :key="idx">
        <div>{{idx + 1}}</div>
        <div>{{item.date}}</div>
        <div>{{item.category}}</div>
        <div>{{item.value}}</div>
        <div class="contextMenu" @click="showMenu(item.id)">
            <span class="op-menu">.</span>
            <span class="op-menu">.</span>
            <span class="op-menu">.</span>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "PaymentsDisplay",
    props: {
        items: {
            type: Array,
            default: ()=>[],
        },
        showItems: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        showMenu (index) {
            this.$modal.show('ContextMenu', {header: 'Menu', index: index})
        }
    //     showMenu (id) {
    //   const title = 'Menu'
    //   const settings = {
    //     modalWindowContent: 'ContextMenu',
    //     itemId: id
    //   }
    //   this.$modal.show(title, settings)
    // }
    }
}
</script>

<style lang="scss">
    .item{
        display: grid;
        grid-template-columns: 40px repeat(auto-fill, 110px);
        border-bottom:1px solid grey;
        }
    .title {
        display: grid;
        grid-template-columns: 40px repeat(auto-fill, 110px);
        border-bottom:1px solid grey;
    }
    .wrapper {
        display: grid;
        width: 400px;
        grid-template-columns: 1fr;
    }
    .contextMenu {
        display: flex;
        flex-direction: column;
        cursor: pointer;
        width: 20px;
        height: 20px;
        align-items: center;
    }
    .op-menu {
        display: inline-block;
        font-size: 25px;
        height: 7px;
        z-index: 100;
    }
   
</style>