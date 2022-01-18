<template>
  <div id="ap">
    

    <Calculator />

    <div class="container">
      <router-view />
    </div>
  </div>
  
</template>

<script>
// @ is an alias to /src

import Calculator from '@/components/Calculator.vue'

export default {
  name: 'App',
  components: {
    Calculator
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 50px;
  width: 700px;
  box-shadow: 0 3px 15px grey;
  background-color: rgb(153, 182, 160);
}


</style>