<script setup>
import {defineProps, watch, ref} from "vue";

const props = defineProps({
  movies: {
    type: Array,
    required: true,
    default: () => []
  }
});

const displayedMovies = ref([]);
const showAll = ref(false);

const showMore = () => {
  const currentLength = displayedMovies.value.length;
  const moviesLeft = props.movies.length - currentLength;
  const nextMovies = props.movies.slice(currentLength, currentLength + 10);
  displayedMovies.value = [...displayedMovies.value, ...nextMovies];

  if (moviesLeft <= 10) {
    showAll.value = true;
  }
};

watch( () => props.movies, () => {
  displayedMovies.value = [...props.movies.slice(0, 10)];
  showAll.value = props.movies.length <= 10;
});
</script>

<template>
  <div class="centered-container">
    <table v-if="displayedMovies.length > 0">
      <thead>
      <tr>
        <th>Title</th>
        <th>Year</th>
        <th>Cast</th>
        <th>Genres</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="movie in displayedMovies" :key="movie.id">
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
    <button v-if="!showAll && displayedMovies.length < props.movies.length" @click="showMore">Show more</button>
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