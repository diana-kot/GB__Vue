<template>
  <div id="app">
    <div class="wrapper">
      <header>
        <router-link to="/dashboard">Dashboard</router-link> /
        <router-link to="/about">about</router-link> /
        <!-- <router-link to="/notfound">notfound</router-link> -->
        <span @click="goToNotFound">notfound</span>

        <!-- <div class="title">My personal costs</div> -->
      </header>
      <main>
        <router-view />
      </main>

      <transition name="fade">
        <modal-window-add-pyament-form
          :settings="settings"
          :componentName="componentName"
          v-if="componentName"
        />
      </transition>

      <transition name="fade">
        <context-menu/>
      </transition>

    </div>
  </div>
</template>

<script>

import ContextMenu from './components/ContextMenu.vue';
export default {
  components: {
    ModalWindowAddPyamentForm: () =>
      import("./components/ModalWindowAddPyamentForm"),
      ContextMenu
  },
  name: "App",

  data() {
    return {
      settings: {},

      componentName: "",
    };
  },
  methods: {
    goToNotFound() {
      if (this.$router.name === "notFound") return;
      this.$router.push({
        name: "notFound",
      });
    },
    onShow({ name, settings }) {
      this.componentName = name;
      this.settings = settings;
    },
    onHide() {

      (this.settings = {}), (this.componentName = "");
    },
  },
  mounted() {
    this.$modal.EventBus.$on("show", this.onShow);
    this.$modal.EventBus.$on("hide", this.onHide);
  },
  beforeDestroy() {
    this.$modal.EventBus.$off("show");
    this.$modal.EventBus.$off("hide");
  },
=
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1 {
  font-size: 20px;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>


