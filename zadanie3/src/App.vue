<template>
<!--  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <MoviesTable />
  <CastList />
  <GenresList />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import MoviesTable from "@/components/MoviesTable.vue";
import CastList from "@/components/CastList.vue";
import GenresList from "@/components/GenresList.vue";

export default {
  name: 'App',
  components: {
    GenresList,
    MoviesTable,
    CastList,
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
