<template>
    <div class="wrapper">
        <div class="title">
        <div><b>#</b></div>
        <div><b>Date</b></div>
        <div><b>Category</b></div>
        <div><b>Value</b></div>
        </div>
        <div class="item" v-for="(item, idx) in items" :key="idx">
            <span>{{ idx + 1 }}</span>
            <span>{{ item.date }}</span>
            <span>{{ item.category }}</span>
            <span>{{ item.value }}</span>
            <span @click="onClickContextItem($event, item)">...</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "PaymentsDisplay",
    props: {
        items: {
        type: Array,
        default: () => [],
        },
        showItems: {
        type: Boolean,
        default: false,
        },
    },
    methods: {
        // this.$modal.show('EditForm', {header: 'Edit form', index: this.index})
        editItem(item) {
            console.log(item);
            this.$router.push('/editForm/'+ item.id)
            
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
                this.$store.commit('delItemFromPaymentList', item.id)                
            },
            },
        ];
        this.$context.show({ event, items });
        },
    },
};
</script>

<style lang="scss">
    .item {
    cursor: pointer;
    border-bottom: 1px solid grey;
    display: flex;
    justify-content: space-between;
    align-items: center;
    }
    .title {
    display: grid;
    grid-template-columns: 40px repeat(auto-fill, 110px);
    border-bottom: 1px solid grey;
    }
    .wrapper {
    display: grid;
    width: 400px;
    grid-template-columns: 1fr;
    }
</style>
