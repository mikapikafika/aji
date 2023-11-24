<script setup>
import { ref } from "vue";
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

  moviesTable.value = [...filteredMovies.value];
};
</script>

<template>
  <div>
    <input v-model="titleFilter" type="text" placeholder="Movie title">
    <input v-model="startYear" type="number" min="1900" max="2019">
    <input v-model="endYear" type="number" min="1900" max="2019">
    <input v-model="castFilter" type="text" placeholder="Name and surname">
    <button @click="searchMovies">Search</button>
  </div>
  <div class="centered-container">
    <table v-if="moviesTable.length > 0">
      <thead>
      <tr>
        <th>Title</th>
        <th>Year</th>
        <th>Cast</th>
        <th>Genres</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="movie in moviesTable" :key="movie.id">
        <td>{{ movie.title }}</td>
        <td>{{ movie.year }}</td>
        <td>{{ movie.cast.join(', ') }}</td>
        <td>{{ movie.genres.join(', ') }}</td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      No movies found.
    </div>
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
