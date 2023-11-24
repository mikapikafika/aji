<script setup>
// import {ref} from "vue";

</script>

<template>
  <div>
    <input v-model="titleFilter" type="text" placeholder="Movie title">
    <input v-model="startYear" type="number" min="1900" max="2019">
    <input v-model="endYear" type="number" min="1900" max="2019">
    <input v-model="castFilter" type="text" placeholder="Name and surname">
    <button @click="searchMovies">Search</button>
  </div>
</template>

<style scoped>

</style>

