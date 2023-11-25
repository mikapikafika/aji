<template>
  <GenresList/>
  <CastList/>
</template>

<script>
import GenresList from "@/components/GenresList.vue";
import CastList from "@/components/CastList.vue";

export default {
  name: 'App',
  components: {
    GenresList,
    CastList
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
