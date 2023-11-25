<script setup>
import {ref, watch} from "vue";
import MoviesTable from "@/components/MoviesTable.vue";
import movies from '../assets/movies.json';

const titleFilter = ref("");
const startYear = ref(1900);
const endYear = ref(2019);
const castFilter = ref("");
const filteredMovies = ref([]);
const moviesTable = ref([]);

const filterByTitle = movie => {
  return movie.title.toLowerCase().includes(titleFilter.value.toLowerCase());
};

const filterByYear = movie => {
  return movie.year >= startYear.value && movie.year <= endYear.value;
};

const filterByCast = movie => {
  if (Array.isArray(movie.cast)) {
    return movie.cast.some(item => typeof item === 'string' && item.toLowerCase().includes(castFilter.value.toLowerCase()));
  }
  return false;
};

const searchMovies = () => {
  filteredMovies.value = movies.filter(movie => {
    const titleMatch = titleFilter.value !== "" ? filterByTitle(movie) : true;
    const yearMatch = startYear.value !== "" || endYear.value !== "" ? filterByYear(movie) : true;
    const castMatch = castFilter.value !== "" ? filterByCast(movie) : true;

    return titleMatch && yearMatch && castMatch;
  });

  // moviesTable.value = [...filteredMovies.value];
};

watch([titleFilter, startYear, endYear, castFilter], () => {
  searchMovies();
});

const emitFilteredMovies = () => {
  moviesTable.value = [...filteredMovies.value];
};
</script>

<template>
  <div>
    <input v-model="titleFilter" type="text" placeholder="Movie title">
    <input v-model="startYear" type="number" min="1900" max="2019">
    <input v-model="endYear" type="number" min="1900" max="2019">
    <input v-model="castFilter" type="text" placeholder="Name and surname">
    <button @click="emitFilteredMovies">Search</button>
    <MoviesTable :movies="filteredMovies"/>
  </div>
</template>

<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
