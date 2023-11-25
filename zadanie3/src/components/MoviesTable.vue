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

watch(() => props.movies, () => {
  displayedMovies.value = [...props.movies.slice(0, 10)];
  showAll.value = props.movies.length <= 10;
});

displayedMovies.value = [...props.movies.slice(0, 10)];
showAll.value = props.movies.length <= 10;
</script>

<template>
  <div class="centered-container">
    <table class="table table-hover" v-if="displayedMovies.length > 0">
      <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Production Year</th>
        <th scope="col">Cast</th>
        <th scope="col">Genres</th>
      </tr>
      </thead>
      <tbody class="table-content">
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
    <button class="btn btn-light" v-if="!showAll && displayedMovies.length < props.movies.length" @click="showMore">
      Show more
    </button>
  </div>
</template>

<style scoped>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.table {
  background: white;
  border-radius: 10px;
}

.table-content {
  padding: 2rem;
}
</style>