<template>
  <h1>Movies Database</h1>
  <SearchBar/>
  <GenresList/>
  <CastList/>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import GenresList from "@/components/GenresList.vue";
import CastList from "@/components/CastList.vue";

export default {
  name: 'App',
  components: {
    SearchBar,
    GenresList,
    CastList
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

body {
  background: #acb0fc;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #323556;
  margin-top: 60px;
}

h1, h2 {
  font-weight: 900;
}
</style>