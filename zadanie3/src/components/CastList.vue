<script setup>
import movies from '../assets/movies.json';
import _ from 'lodash';
import {computed, ref} from "vue";

// Choose random movies that have cast members
const nonEmptyCastMovies = movies.filter(movie => movie.cast && movie.cast.length > 0);
const randomMovies = _.sampleSize(nonEmptyCastMovies, 100);
console.log("Total number of movies:", randomMovies.length);

// Create a dictionary that maps cast members to movies
const moviesByCast = ref({});
const uniqueCast = _.uniq(_.flatten(randomMovies.map(movie => movie.cast)))
    .filter(actor => actor.length >= 5).sort();
console.log("Total number of cast members:", uniqueCast.length);

// Populate the dictionary
for (const actor of uniqueCast) {
  moviesByCast.value[actor] = randomMovies.filter(movie => movie.cast && movie.cast.includes(actor));
}

// Control the visibility of movies by cast
const moviesByCastVisibility = ref({});
uniqueCast.forEach((cast) => {
  moviesByCastVisibility.value[cast] = false;
});

function toggleMoviesVisibility(cast) {
  moviesByCastVisibility.value[cast] = !moviesByCastVisibility.value[cast];
}

// Sorting
const sortOrder = ref('asc');
function toggleSortOrder() {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
}

// Reactive sorting (computed property)
const sortedCast = computed(() => {
  return _.orderBy(uniqueCast, [], sortOrder.value);
});
</script>

<template>
  <div class="movies-by-container">
    <h2>Movies by cast</h2>
    <button class="btn btn-light shadow" @click="toggleSortOrder">
      Sort {{ sortOrder === 'asc' ? 'descending' : 'ascending' }}
    </button>
    <ul class="list-group">
      <li class="cast list-group-item shadow" v-for="cast in sortedCast" :key="cast">
        {{ cast }}
        <span class="badge badge-pill"><button class="btn btn-light btn-show"
                                               @click="toggleMoviesVisibility(cast)">Show / Hide</button></span>
        <ol v-if="moviesByCastVisibility[cast]">
          <li class="movies-by-cast" v-for="movie in moviesByCast[cast]" :key="movie.id">{{ movie.title }}</li>
        </ol>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.cast {
  list-style: none;
  margin: 1rem;
  font-weight: 500;
  font-size: 1.3rem;
  border-radius: 10px;
}

.movies-by-cast {
  margin: 0.5rem;
  font-weight: 300;
  font-size: 1rem;
}

.btn-show {
  border-color: #6c757d;
}

</style>

