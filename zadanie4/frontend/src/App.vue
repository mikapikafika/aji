<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <ProductsTable/>
</template>

<script>
import ProductsTable from "@/views/ProductsTable.vue";

export default {
  name: 'App',
  components: {
    ProductsTable,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
