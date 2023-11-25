<script setup>
import movies from '../assets/movies.json';
import _ from 'lodash';
import {ref} from "vue";

const moviesByCast = ref({});
const moviesCast = _.cloneDeep(movies);


const nonEmptyCastMovies = _.filter(moviesCast, (movie) => {
  console.log(movie.cast);
  return movie.cast && movie.cast.length > 0;
});

const uniqueCast = ref(_.uniq(_.flatten(_.map(nonEmptyCastMovies, 'cast'))).slice(0, 100));


for (const actor of uniqueCast.value) {
  moviesByCast.value[actor] = _.filter(moviesCast, (movie) => {
    return movie.cast && movie.cast.includes(actor);
  });
}

const moviesByCastVisibility = ref({});
uniqueCast.value.forEach((cast) => {
  moviesByCastVisibility.value[cast] = false;
});

function toggleMoviesVisibility(cast) {
  moviesByCastVisibility.value[cast] = !moviesByCastVisibility.value[cast];
}
</script>

<template>
  <div>
    <h3>Movies by cast</h3>
    <ul>
      <li class="cast" v-for="cast in uniqueCast" :key="cast">
        {{ cast }}
        <button @click="toggleMoviesVisibility(cast)">Show/Hide Movies</button>
        <ul v-if="moviesByCastVisibility[cast]">
          <li class="movies_by_cast" v-for="movie in moviesByCast[cast]" :key="movie.id">{{ movie.title }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.cast, .movies_by_cast {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>

