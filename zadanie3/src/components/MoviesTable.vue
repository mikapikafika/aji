<script setup>
import {defineProps, watch, ref} from "vue";

// Props that are passed to the component
const props = defineProps({
  movies: {
    type: Array,
    required: true,
    default: () => []
  }
});

// Reactive reference to the movies that are currently displayed
const displayedMovies = ref([]);
const showAll = ref(false);

// Function that is called when the user clicks on the "Show more" button
const showMore = () => {
  const currentLength = displayedMovies.value.length;
  const nextMovies = props.movies.slice(currentLength, currentLength + 10);

  displayedMovies.value.push(...nextMovies);

  if (props.movies.length - currentLength <= 10) {
    showAll.value = true;
  }
};

const showLess = () => {
  const currentLength = displayedMovies.value.length;
  if (currentLength <= 10) {
    displayedMovies.value = props.movies.slice(0, 10);
    showAll.value = false;
  } else {
    displayedMovies.value.splice(-10);
    showAll.value = false;
  }
};

// Watch for changes in the movies prop and update the displayed movies
watch(() => props.movies, () => {
  displayedMovies.value = [...props.movies.slice(0, 10)];
  showAll.value = props.movies.length <= 10;
});

displayedMovies.value = [...props.movies.slice(0, 10)];
showAll.value = props.movies.length <= 10;
</script>

<template>
  <div class="movies-table-container">
    <table class="table table-hover shadow" v-if="displayedMovies.length > 0">
      <thead>
      <tr>
        <th scope="col">No.</th>
        <th scope="col">Title</th>
        <th scope="col">Production Year</th>
        <th scope="col">Cast</th>
        <th scope="col">Genres</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(movie, index) in displayedMovies" :key="movie.id">
        <td>{{ index + 1 }}</td>
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
    <div class="buttons-container">
      <button class="btn btn-light" v-if="displayedMovies.length < props.movies.length" @click="showMore"
              :disabled="showAll">
        Show more
      </button>
      <button class="btn btn-light" v-if="displayedMovies.length > 0" @click="showLess"
              :disabled="displayedMovies.length <= 10">
        Show less
      </button>
    </div>
  </div>
</template>

<style scoped>
.table {
  background: white;
  border-radius: 10px;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
}

.btn {
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>