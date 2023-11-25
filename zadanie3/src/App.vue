<template>
  <SearchBar/>
<!--  <MoviesTable movies="movies"/>-->
  <GenresList/>
  <CastList/>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
// import MoviesTable from "@/components/MoviesTable.vue";
import movies from './assets/movies.json';
import GenresList from "@/components/GenresList.vue";
import CastList from "@/components/CastList.vue";

export default {
  name: 'App',
  components: {
    SearchBar,
    // MoviesTable,
    GenresList,
    CastList
  },
  data() {
    return {
      movies: movies
    }
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
