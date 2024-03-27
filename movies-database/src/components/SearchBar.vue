<script setup>
import {ref, watch} from "vue";
import MoviesTable from "@/components/MoviesTable.vue";
import movies from '../assets/movies.json';

// Initialize reactive refs for filters and movies table
const titleFilter = ref("");
const startYear = ref(1900);
const endYear = ref(2019);
const castFilter = ref("");
const moviesTable = ref([]);

// Filter functions
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

// Search function that is called on every filter change
const searchMovies = () => {
  moviesTable.value = movies.filter(movie => {
    const titleMatch = titleFilter.value !== "" ? filterByTitle(movie) : true;
    const yearMatch = startYear.value !== "" || endYear.value !== "" ? filterByYear(movie) : true;
    const castMatch = castFilter.value !== "" ? filterByCast(movie) : true;

    return titleMatch && yearMatch && castMatch;
  });
};

// Initialize movies table
moviesTable.value = [...movies];

// Watch for filter changes
watch([titleFilter, startYear, endYear, castFilter], () => {
  searchMovies();
});

</script>

<template>
  <div class="movies-table-container">
    <form>
      <div class="input-group mb-3 shadow">
        <div class="input-group-prepend">
          <span class="input-group-text">Title</span>
        </div>
        <input class="form-control" v-model="titleFilter" type="text"
               placeholder="Full title or its part">
      </div>
      <div class="input-group mb-3 shadow">
        <div class="input-group-prepend">
          <span class="input-group-text">Production year (from)</span>
        </div>
        <input class="form-control" v-model="startYear" type="number" min="1900" max="2019">
      </div>
      <div class="input-group mb-3 shadow">
        <div class="input-group-prepend">
          <span class="input-group-text">Production year (to)</span>
        </div>
        <input class="form-control" v-model="endYear" type="number" min="1900" max="2019">
      </div>
      <div class="input-group mb-3 shadow">
        <div class="input-group-prepend">
          <span class="input-group-text">Cast</span>
        </div>
        <input class="form-control" v-model="castFilter" type="text" placeholder="Name and/or surname">
      </div>
    </form>
    <MoviesTable :movies="moviesTable"/>
  </div>
</template>

<style scoped>

</style>