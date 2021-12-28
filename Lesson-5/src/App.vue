<template>
  <div id="app">
    <div class="wrapper">
      <header>
        <router-link to="/dashboard">Dashboard</router-link> /
        <router-link to="/about">about</router-link> /
        <!-- <router-link to="/notfound">notfound</router-link> -->
        <span @click="goToNotFound">notfound</span>

        
      

        <!-- <div class="title">My personal costs</div>
        <div class="total" v-if="total">Total:{{ total }}</div> -->
      </header>
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>


export default {
  
  name: "App",
 
  data() {
    return {
     
    };
  },
  methods: {
  goToNotFound (){
    if(this.$router.name === 'notFound') return;
    this.$router.push({
      name: "notFound"
    })
  }
  }
  
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
