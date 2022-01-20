<template>
    <div class="wrapper">
        <div class="paments">
            <span>Добавить статью затрат:</span>
            <router-link
                :to="{
                    name: 'AddNewPayments',
                    params: { category: 'Food' },
                    query: { value: '200' },
                }"
            >Food 200</router-link>
            <router-link
                :to="{
                    name: 'AddNewPayments',
                    params: { category: 'Transport' },
                    query: { value: '50' },
                }"
            >Transport 50</router-link>
            <router-link
                :to="{
                    name: 'AddNewPayments',
                    params: { category: 'Entertainment' },

                    query: { value: '2000' },

                }"
            >Entertainment 2000</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddNewPayments',
};

</script>

<style>
.paments {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    margin-bottom: 20px;
}
</style>