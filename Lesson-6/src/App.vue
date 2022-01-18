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
      <modal-window-add-pyament-form />
      <transition name="fade">
        <modal-window-add-pyament-form
          :settings="settings"
          :componentName="componentName"
          v-if="componentName"
        />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
   components: {
    ModalWindowAddPyamentForm: () =>
      import(
      "./components/ModalWindowAddPyamentForm.vue"
      ),
  },

  data() {
    return {
      settings:{

      },
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
      this.settings = {};
      this.componentName = "";
    },
  },
  
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
.tt {
  height: 160px;
}
</style>
