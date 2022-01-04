<template>
    <div class="wrapper">
        <div class="header">{{ settings.header }}</div>
        <div class="content">
            <add-payment-form v-if="settings.content === 'AddPaymentForm'"/>
            <auth-form v-if="settings.content ==='auth'"/>
        </div>
        <div class="footer">
            <button @click="onclickClose">Close</button>
        </div>
    </div>
</template>

<script>
import AuthForm from './AuthForm.vue';
import AddPaymentForm from "./AddPaymentForm.vue";
export default {
    props: {
        settings: Object
    },
    components: { AddPaymentForm, AuthForm },
    methods: {
        onclickClose() {
            this.$modal.hide();
        },
    },
};
</script>

<style lang="scss" scoped>
.wrapper {
  border: 1px solid red;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffffffd9;
}
  .overlay {
    z-index: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(68, 61, 61, 0.5);
  }
  .content {
    position: relative;
    z-index: 100;
  }
  .footer {
    top: 140px;
    position: relative;
    z-index: 100;
  }

</style>
