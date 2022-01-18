<template>
  <v-app>
    <v-app-bar app color="teal">
      <v-btn :plain="true" dark :ripple="false" to="/costs">Costs</v-btn>
      <v-btn plain dark :ripple="false" to="/about">About</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">

</style>

