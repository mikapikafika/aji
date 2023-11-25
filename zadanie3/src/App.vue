<template>
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <MoviesTable  movies=""/>
  <SearchBar/>
</template>

<script>
import MoviesTable from "@/components/MoviesTable.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: 'App',
  components: {
    SearchBar,
    MoviesTable,
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
