<script setup>
// import {ref} from "vue";

</script>

<template>
  <div>
    <input v-model="searchFilter" type="text" placeholder="Search for a movie">
    <input v-model="genreFilter" type="text" placeholder="Choose genre">
    <input v-model="startDate" type="date" placeholder="Start Date">
    <input v-model="endDate" type="date" placeholder="End Date">
    <button @click="searchMovie">Search</button>
  </div>
</template>

<style scoped>

</style>

